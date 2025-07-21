/**
 * Replay Controller - Gerencia execução de replays no background
 * Garante continuidade mesmo com mudanças de aba/URL
 */

import { recordingStore } from '../storage/recording-store';
import { 
  ReplayRequest, 
  ReplayState, 
  ReplayStatus,
  ReplayMessage,
  ReplayMessageType,
  ReplayResult,
  ReplayMode
} from '../../types/replay';

interface InternalReplayLog {
  step: string;
  ts: number;
  status: 'OK' | 'FAIL' | 'INFO' | 'WARN';
  detail?: string;
}

interface ReplayConfig {
  maxRetries: number;
  defaultTimeout: number;
  logLevel: 'debug' | 'info' | 'error';
}

interface ActiveReplay {
  tabId: number;
  recordingId: string;
  state: ReplayState;
  logs: InternalReplayLog[];
  startTime: number;
  currentStep: number;
}

class ReplayController {
  private static instance: ReplayController;
  private activeReplays: Map<number, ActiveReplay> = new Map();
  private config: ReplayConfig = {
    maxRetries: 3,
    defaultTimeout: 5000,
    logLevel: 'debug'
  };
  private logBuffer: Map<string, InternalReplayLog[]> = new Map();
  private logFlushInterval: NodeJS.Timer | null = null;

  private constructor() {
    this.loadConfig();
    this.setupListeners();
    this.startLogFlusher();
  }

  static getInstance(): ReplayController {
    if (!ReplayController.instance) {
      ReplayController.instance = new ReplayController();
    }
    return ReplayController.instance;
  }

  private log(tabId: number, step: string, status: 'OK' | 'FAIL' | 'INFO' | 'WARN', detail?: string) {
    const timestamp = Date.now();
    const log: InternalReplayLog = { step, ts: timestamp, status, detail };
    
    // Adiciona ao buffer de logs
    const replay = this.activeReplays.get(tabId);
    if (replay) {
      replay.logs.push(log);
    }

    // Formata e exibe no console
    const prefix = '[REPLAY-BG]';
    const tabInfo = `[Tab:${tabId}]`;
    const statusEmoji = {
      'OK': '✅',
      'FAIL': '❌',
      'INFO': 'ℹ️',
      'WARN': '⚠️'
    }[status];
    
    const message = `${prefix} ${tabInfo} ${statusEmoji} ${step}${detail ? ` - ${detail}` : ''}`;
    
    if (this.config.logLevel === 'debug' || status === 'FAIL') {
      console.log(message, { timestamp, tabId, status });
    }
  }

  private async loadConfig() {
    try {
      const result = await chrome.storage.sync.get('replayConfig');
      if (result.replayConfig) {
        this.config = { ...this.config, ...result.replayConfig };
      }
      this.log(-1, 'Config loaded', 'OK', JSON.stringify(this.config));
    } catch (error) {
      this.log(-1, 'Failed to load config', 'FAIL', error instanceof Error ? error.message : String(error));
    }
  }

  private setupListeners() {
    // Listener para mudanças de navegação
    chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
      const replay = this.activeReplays.get(details.tabId);
      if (replay) {
        this.log(details.tabId, 'Navigation detected', 'INFO', `URL: ${details.url}`);
        this.handleNavigationChange(details.tabId, details.url);
      }
    });

    // Listener para quando aba é fechada
    chrome.tabs.onRemoved.addListener((tabId) => {
      if (this.activeReplays.has(tabId)) {
        this.log(tabId, 'Tab closed', 'WARN', 'Cleaning up replay');
        this.stop(tabId);
      }
    });

    // Listener para erros de runtime
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'REPLAY_STATUS' && sender.tab?.id) {
        this.handleStatusUpdate(sender.tab.id, message);
      }
    });
  }

  private startLogFlusher() {
    // Envia logs em batch a cada 200ms
    this.logFlushInterval = setInterval(() => {
      this.flushLogs();
    }, 200);
  }

  private async flushLogs() {
    if (this.logBuffer.size === 0) return;

    for (const [sessionId, logs] of this.logBuffer.entries()) {
      try {
        // Salva logs no storage
        const key = `replayLogs:${sessionId}`;
        await chrome.storage.local.set({ [key]: logs });
        
        // Envia para popup/devtools
        chrome.runtime.sendMessage({
          type: 'BG_STATUS',
          sessionId,
          logs: logs.slice(-10) // Últimos 10 logs
        });
      } catch (error) {
        console.error('[REPLAY-BG] Failed to flush logs:', error);
      }
    }
    
    this.logBuffer.clear();
  }

  async init() {
    this.log(-1, 'ReplayController initialized', 'OK');
    
    // Restaura replays ativos se houver
    try {
      const result = await chrome.storage.local.get('activeReplays');
      if (result.activeReplays) {
        this.log(-1, 'Restoring active replays', 'INFO', `Count: ${Object.keys(result.activeReplays).length}`);
      }
    } catch (error) {
      this.log(-1, 'Failed to restore replays', 'FAIL', error instanceof Error ? error.message : String(error));
    }
  }

  async start(request: ReplayRequest): Promise<number> {
    this.log(-1, 'Starting replay', 'INFO', `Recording: ${request.recordingId}`);
    
    try {
      // Busca a gravação
      const recording = await recordingStore.get(request.recordingId);
      if (!recording) {
        throw new Error('Recording not found');
      }
      
      this.log(-1, 'Recording found', 'OK', `Actions: ${recording.actions.length}`);
      
      // Determina URL inicial com validação
      const initialUrl = recording.urlOriginal || recording.firstUrl || recording.url;
      
      if (!initialUrl || initialUrl === 'undefined' || initialUrl === '/undefined/') {
        throw new Error('URL inicial inválida ou não definida na gravação');
      }
      
      this.log(-1, 'Initial URL determined', 'OK', initialUrl);
      
      // Cria nova aba
      const tab = await chrome.tabs.create({ 
        url: initialUrl,
        active: true 
      });
      
      if (!tab.id) {
        throw new Error('Failed to create tab');
      }
      
      this.log(tab.id, 'Tab created', 'OK', `URL: ${initialUrl}`);
      
      // Registra replay ativo
      this.activeReplays.set(tab.id, {
        tabId: tab.id,
        recordingId: request.recordingId,
        state: {
          status: 'preparing' as ReplayStatus,
          currentStep: 0,
          totalSteps: recording.actions.length,
          tabId: tab.id
        },
        logs: [],
        startTime: Date.now(),
        currentStep: 0
      });
      
      // Aguarda página carregar
      this.log(tab.id, 'Waiting for page load', 'INFO');
      await this.waitForTabReady(tab.id);
      
      // Injeta script do runner
      this.log(tab.id, 'Injecting replay runner', 'INFO');
      await this.injectReplayRunner(tab.id);
      
      // Envia ações para execução
      this.log(tab.id, 'Sending actions for execution', 'INFO', `Count: ${recording.actions.length}`);
      await this.executeReplay(tab.id, recording.actions, request.mode || ReplayMode.KEEP_CACHE);
      
      return tab.id;
      
    } catch (error) {
      this.log(-1, 'Failed to start replay', 'FAIL', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  private async waitForTabReady(tabId: number, maxWait = 10000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWait) {
      try {
        const tab = await chrome.tabs.get(tabId);
        if (tab.status === 'complete') {
          this.log(tabId, 'Tab ready', 'OK', `Load time: ${Date.now() - startTime}ms`);
          return;
        }
      } catch (error) {
        this.log(tabId, 'Tab check failed', 'FAIL', error instanceof Error ? error.message : String(error));
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error('Tab load timeout');
  }

  private async injectReplayRunner(tabId: number): Promise<void> {
    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['replayRunner.bundle.js']
      });
      
      this.log(tabId, 'Runner injected', 'OK');
      
      // Aguarda confirmação do runner
      await this.waitForRunnerReady(tabId);
      
    } catch (error) {
      this.log(tabId, 'Failed to inject runner', 'FAIL', error instanceof Error ? error.message : String(error));
      throw error;
    }
  }

  private async waitForRunnerReady(tabId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Runner ready timeout'));
      }, 5000);
      
      const listener = (message: any, sender: chrome.runtime.MessageSender) => {
        if (sender.tab?.id === tabId && message.type === 'RUNNER_READY') {
          clearTimeout(timeout);
          chrome.runtime.onMessage.removeListener(listener);
          this.log(tabId, 'Runner ready', 'OK');
          resolve();
        }
      };
      
      chrome.runtime.onMessage.addListener(listener);
    });
  }

  private async executeReplay(tabId: number, actions: any[], mode: string): Promise<void> {
    const replay = this.activeReplays.get(tabId);
    if (!replay) return;
    
    // Atualiza estado
    replay.state.status = 'running';
    this.broadcastState(tabId, replay.state);
    
    // Envia comando de execução
    this.log(tabId, 'Executing replay', 'INFO', `Mode: ${mode}`);
    
    chrome.tabs.sendMessage(tabId, {
      type: 'REPLAY_EXECUTE',
      actions,
      mode
    });
  }

  private handleNavigationChange(tabId: number, url: string) {
    const replay = this.activeReplays.get(tabId);
    if (!replay) return;
    
    this.log(tabId, 'Handling navigation', 'INFO', `New URL: ${url}`);
    
    // Re-injeta runner se necessário
    chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        return typeof window.deploysentinel_runner_loaded !== 'undefined';
      }
    }).then(results => {
      if (!results[0]?.result) {
        this.log(tabId, 'Runner not found after navigation', 'WARN', 'Re-injecting');
        this.injectReplayRunner(tabId);
      }
    });
  }

  private handleStatusUpdate(tabId: number, message: any) {
    const replay = this.activeReplays.get(tabId);
    if (!replay) return;
    
    // Log da atualização
    this.log(tabId, 'Status update', 'INFO', `Step ${message.currentStep}/${message.totalSteps}`);
    
    // Atualiza estado
    if (message.status) {
      replay.state.status = message.status;
    }
    if (message.currentStep !== undefined) {
      replay.state.currentStep = message.currentStep;
      replay.currentStep = message.currentStep;
    }
    if (message.error) {
      replay.state.error = message.error;
    }
    
    // Broadcast para interessados
    this.broadcastState(tabId, replay.state);
    
    // Se completou ou falhou, finaliza
    if (message.status === 'completed' || message.status === 'error') {
      this.handleReplayComplete(tabId, message);
    }
  }

  private handleReplayComplete(tabId: number, result: any) {
    const replay = this.activeReplays.get(tabId);
    if (!replay) return;
    
    const duration = Date.now() - replay.startTime;
    
    if (result.status === 'completed') {
      this.log(tabId, 'Replay completed', 'OK', `Duration: ${duration}ms`);
    } else {
      this.log(tabId, 'Replay failed', 'FAIL', result.error || 'Unknown error');
    }
    
    // Salva logs finais
    const sessionId = `${replay.recordingId}_${replay.startTime}`;
    this.logBuffer.set(sessionId, replay.logs);
    
    // Remove do mapa de ativos
    this.activeReplays.delete(tabId);
    
    // Broadcast resultado final
    chrome.runtime.sendMessage({
      type: 'REPLAY_RESULT',
      tabId,
      success: result.status === 'completed',
      error: result.error,
      duration
    });
  }

  private broadcastState(tabId: number, state: ReplayState) {
    chrome.runtime.sendMessage({
      type: 'REPLAY_STATUS',
      ...state
    });
  }

  stop(tabId: number) {
    const replay = this.activeReplays.get(tabId);
    if (!replay) return;
    
    this.log(tabId, 'Stopping replay', 'WARN', 'User requested');
    
    // Envia comando de parada
    chrome.tabs.sendMessage(tabId, { type: 'REPLAY_STOP' });
    
    // Limpa estado
    this.activeReplays.delete(tabId);
    
    // Notifica
    this.broadcastState(tabId, {
      status: 'idle' as ReplayStatus,
      currentStep: 0,
      totalSteps: 0,
      tabId
    });
  }

  getState(tabId: number): ReplayState | null {
    const replay = this.activeReplays.get(tabId);
    return replay?.state || null;
  }

  async getLogs(sessionId: string): Promise<InternalReplayLog[]> {
    try {
      const key = `replayLogs:${sessionId}`;
      const result = await chrome.storage.local.get(key);
      return result[key] || [];
    } catch (error) {
      this.log(-1, 'Failed to get logs', 'FAIL', error instanceof Error ? error.message : String(error));
      return [];
    }
  }
}

export const replayController = ReplayController.getInstance();