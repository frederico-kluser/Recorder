/**
 * ReplayHandler - Gerencia comunicação entre popup e runner para execução de replay
 * Coordena abertura de nova aba, injeção de script e monitoramento de status
 */

import type { ReplayRequest, ReplayState, ReplayStatusUpdate, ReplayExecute, ReplayResult } from '../../types/replay';
import type { RecordingEntry } from '../../pages/types/recording';
import { recordingStore } from '../../pages/storage/recording-store';

class ReplayHandler {
  private static instance: ReplayHandler;
  private replayTabs: Map<number, ReplayState>;
  
  private constructor() {
    this.replayTabs = new Map();
    this.setupMessageListeners();
  }
  
  /**
   * Obtém instância singleton do ReplayHandler
   */
  static getInstance(): ReplayHandler {
    if (!ReplayHandler.instance) {
      ReplayHandler.instance = new ReplayHandler();
    }
    return ReplayHandler.instance;
  }
  
  /**
   * Configura listeners para mensagens
   */
  private setupMessageListeners(): void {
    chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
      if (message.type === 'REPLAY_REQUEST') {
        this.handleReplayRequest(message as ReplayRequest, sendResponse);
        return true; // Indica resposta assíncrona
      }
      
      if (message.type === 'REPLAY_RESULT' && sender.tab?.id) {
        this.handleReplayResult(message as ReplayResult, sender.tab.id);
      }
    });
    
    // Limpa estado quando aba é fechada
    chrome.tabs.onRemoved.addListener((tabId) => {
      if (this.replayTabs.has(tabId)) {
        this.replayTabs.delete(tabId);
        this.broadcastStatusUpdate(tabId, {
          status: 'idle',
          currentStepIndex: 0,
          totalSteps: 0,
          startTime: null
        });
      }
    });
  }
  
  /**
   * Processa requisição de replay
   */
  private async handleReplayRequest(
    request: ReplayRequest, 
    sendResponse: (response: any) => void
  ): Promise<void> {
    try {
      // Busca gravação no storage
      const recording = await recordingStore.get(request.recordingId);
      
      if (!recording) {
        sendResponse({ success: false, error: 'Gravação não encontrada' });
        return;
      }
      
      // Cria nova aba com a URL original da gravação
      const urlToUse = recording.urlOriginal || recording.firstUrl || recording.url || '/';
      const tab = await chrome.tabs.create({
        url: urlToUse,
        active: true
      });
      
      if (!tab.id) {
        sendResponse({ success: false, error: 'Falha ao criar aba' });
        return;
      }
      
      // Inicializa estado do replay
      const state: ReplayState = {
        status: 'preparing',
        currentStepIndex: 0,
        totalSteps: recording.actions.length,
        startTime: Date.now()
      };
      
      this.replayTabs.set(tab.id, state);
      
      // Aguarda aba carregar
      const listener = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          
          // Injeta script do runner
          chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            files: ['replayRunner.bundle.js']
          }).then(() => {
            // Envia ações para execução
            const executeMessage: ReplayExecute = {
              type: 'REPLAY_EXECUTE',
              actions: recording.actions,
              initialUrl: recording.urlOriginal || recording.firstUrl || recording.url || '/',
              mode: request.mode
            };
            
            chrome.tabs.sendMessage(tab.id!, executeMessage);
            
            // Atualiza status para running
            const runningState: ReplayState = {
              ...state,
              status: 'running'
            };
            
            if (tab.id) {
              this.replayTabs.set(tab.id, runningState);
              this.broadcastStatusUpdate(tab.id, runningState);
            }
          }).catch((error) => {
            sendResponse({ success: false, error: `Falha ao injetar script: ${error.message}` });
          });
        }
      };
      
      chrome.tabs.onUpdated.addListener(listener);
      
      sendResponse({ success: true, tabId: tab.id });
      
    } catch (error) {
      sendResponse({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro desconhecido' 
      });
    }
  }
  
  /**
   * Processa resultado do replay
   */
  private handleReplayResult(result: ReplayResult, tabId: number): void {
    const state = this.replayTabs.get(tabId);
    
    if (!state) return;
    
    const updatedState: ReplayState = {
      ...state,
      status: result.success ? 'completed' : 'error',
      currentStepIndex: result.completedSteps || 0,
      error: result.error
    };
    
    this.replayTabs.set(tabId, updatedState);
    this.broadcastStatusUpdate(tabId, updatedState);
    
    // Remove estado após 5 segundos se completado
    if (result.success) {
      setTimeout(() => {
        this.replayTabs.delete(tabId);
      }, 5000);
    }
  }
  
  /**
   * Envia atualização de status para todos os listeners
   */
  private broadcastStatusUpdate(tabId: number, state: ReplayState): void {
    const update: ReplayStatusUpdate = {
      type: 'REPLAY_STATUS',
      state,
      tabId
    };
    
    // Envia para popup
    try {
      chrome.runtime.sendMessage(update);
    } catch {
      // Ignora erro se popup não estiver aberto
    }
  }
  
  /**
   * Obtém estado atual do replay para uma aba
   */
  getReplayState(tabId: number): ReplayState | null {
    return this.replayTabs.get(tabId) || null;
  }
  
  /**
   * Para replay em execução
   */
  stopReplay(tabId: number): void {
    if (this.replayTabs.has(tabId)) {
      chrome.tabs.remove(tabId).catch(() => {
        // Ignora erro se aba já foi fechada
      });
    }
  }
}

// Exporta instância singleton
export const replayHandler = ReplayHandler.getInstance();