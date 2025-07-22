/**
 * ReplayEngine - Motor principal do sistema de replay
 * Responsável por orquestrar a execução de ações gravadas
 */

import {
  ReplaySession,
  ReplayStatus,
  ReplayOptions,
  CacheMode,
} from '../types/session';
import {
  ReplayEvent,
  ReplayEventType,
  ReplayMessage,
  ReplayMessageType,
} from '../types/events';
import { Action, ActionType, ResizeAction } from '../../pages/types/index';
import { recordingStore } from '../../pages/storage/recording-store';
import { EventBus } from '../utils/event-bus';
import { ActionExecutorFactory } from './executors/factory';
import { throttle } from 'lodash';
import { configManager } from '../config';
import { ReplayConfig } from '../config/default';

export class ReplayEngine {
  private static instance: ReplayEngine;
  private sessions: Map<string, ReplaySession> = new Map();
  private eventBus: EventBus = new EventBus();
  private throttledPersist: Function;
  private executorFactory: ActionExecutorFactory;
  private config: ReplayConfig | null = null;

  private constructor() {
    this.throttledPersist = throttle(this.persistState.bind(this), 500);
    this.executorFactory = new ActionExecutorFactory();
    this.initEngine();
  }

  private async initEngine(): Promise<void> {
    await configManager.init();
    this.config = configManager.getConfig();
    await this.restoreState();
  }

  public static getInstance(): ReplayEngine {
    if (!ReplayEngine.instance) {
      ReplayEngine.instance = new ReplayEngine();
    }
    return ReplayEngine.instance;
  }

  /**
   * Inicia uma nova sessão de replay
   */
  public async startReplay(
    recordingId: string,
    options: ReplayOptions
  ): Promise<ReplaySession> {
    console.log('[ReplayEngine] Starting replay for recording:', recordingId);

    try {
      // Buscar ações da gravação
      const recording = await recordingStore.get(recordingId);
      if (!recording) {
        throw new Error(`Recording ${recordingId} not found`);
      }

      // Criar nova sessão
      const session: ReplaySession = {
        id: `replay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        actions: recording.actions,
        startedAt: Date.now(),
        status: ReplayStatus.IDLE,
        currentActionIndex: 0,
      };

      this.sessions.set(session.id, session);

      // Criar nova aba
      const tab = await this.createReplayTab(
        recording.urlOriginal,
        options.cacheMode
      );
      session.tabId = tab.id;

      // Aguardar aba carregar
      await this.waitForTabReady(tab.id!);

      // Injetar script runner
      await this.injectReplayRunner(tab.id!);

      // Atualizar status
      session.status = ReplayStatus.RUNNING;
      this.emitEvent(ReplayEventType.SESSION_STARTED, session.id, { session });

      // Executar ações
      this.executeActions(session.id, options);

      console.log('[ReplayEngine] Replay iniciado:', session.id);
      return session;
    } catch (error) {
      console.error('[ReplayEngine] Error starting replay:', error);
      throw error;
    }
  }

  /**
   * Pausa uma sessão de replay
   */
  public pauseReplay(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    if (session.status === ReplayStatus.RUNNING) {
      session.status = ReplayStatus.PAUSED;
      session.pausedAt = Date.now();
      this.emitEvent(ReplayEventType.SESSION_PAUSED, sessionId, { session });
      this.throttledPersist();
    }
  }

  /**
   * Retoma uma sessão pausada
   */
  public resumeReplay(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    if (session.status === ReplayStatus.PAUSED) {
      session.status = ReplayStatus.RUNNING;
      delete session.pausedAt;
      this.emitEvent(ReplayEventType.SESSION_RESUMED, sessionId, { session });

      // Retomar execução das ações
      const options = this.getSessionOptions(sessionId);
      this.executeActions(sessionId, options);
    }
  }

  /**
   * Para uma sessão de replay
   */
  public async stopReplay(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = ReplayStatus.COMPLETED;
    session.completedAt = Date.now();

    // Fechar aba se existir
    if (session.tabId) {
      try {
        await chrome.tabs.remove(session.tabId);
      } catch (error) {
        console.warn('[ReplayEngine] Error closing tab:', error);
      }
    }

    this.emitEvent(ReplayEventType.SESSION_COMPLETED, sessionId, { session });
    this.sessions.delete(sessionId);
    this.throttledPersist();
  }

  /**
   * Obtém o status de uma sessão
   */
  public getSession(sessionId: string): ReplaySession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Obtém todas as sessões ativas
   */
  public getActiveSessions(): ReplaySession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Registra um listener para eventos
   */
  public on(event: ReplayEventType, handler: Function): void {
    this.eventBus.on(event, handler);
  }

  /**
   * Remove um listener de eventos
   */
  public off(event: ReplayEventType, handler: Function): void {
    this.eventBus.off(event, handler);
  }

  /**
   * Executa as ações de uma sessão
   */
  private async executeActions(
    sessionId: string,
    options: ReplayOptions
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.tabId) return;

    try {
      while (
        session.currentActionIndex < session.actions.length &&
        session.status === ReplayStatus.RUNNING
      ) {
        const action = session.actions[session.currentActionIndex];

        console.log(
          `[ReplayEngine] Executando ação ${session.currentActionIndex + 1}/${
            session.actions.length
          }: ${action.type}`
        );

        try {
          // Executar ação via mensagem para o runner
          await this.executeAction(session.tabId, action, options);

          console.log(
            `[ReplayEngine] Ação executada com sucesso: ${action.type}`
          );
        } catch (actionError) {
          console.error(
            `[ReplayEngine] Erro ao executar ação ${action.type}:`,
            actionError
          );
          throw actionError;
        }

        session.currentActionIndex++;

        // Emitir progresso
        this.emitProgress(sessionId);

        // Salvar estado conforme configuração
        if (
          session.currentActionIndex %
            (this.config?.progressSaveInterval || 20) ===
          0
        ) {
          this.throttledPersist();
        }

        // Delay entre ações
        const delay = options.retryDelay || this.config?.retryDelay || 1000;
        if (session.currentActionIndex < session.actions.length) {
          await this.delay(delay);
        }
      }

      // Verificar se completou todas as ações
      if (session.currentActionIndex >= session.actions.length) {
        await this.stopReplay(sessionId);
      }
    } catch (error) {
      console.error('[ReplayEngine] Error executing actions:', error);
      session.status = ReplayStatus.ERROR;
      session.error = error instanceof Error ? error.message : String(error);
      this.emitEvent(ReplayEventType.SESSION_ERROR, sessionId, { error });
    }
  }

  /**
   * Executa uma ação individual
   */
  private async executeAction(
    tabId: number,
    action: Action,
    options: ReplayOptions
  ): Promise<void> {
    // Tratar ação de resize diretamente no background
    if (action.type === ActionType.Resize) {
      return this.executeResizeAction(action as any);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Action timeout: ${action.type}`));
      }, this.config?.actionTimeout || 30000);

      chrome.tabs.sendMessage(
        tabId,
        {
          type: 'EXECUTE_ACTION',
          action,
          options: {
            maxRetries: options.maxRetries || this.config?.maxRetries || 3,
            autoScroll:
              options.autoScroll !== false && this.config?.autoScroll !== false,
          },
        },
        (response) => {
          clearTimeout(timeout);

          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else if (response?.error) {
            reject(new Error(response.error));
          } else {
            resolve();
          }
        }
      );
    });
  }

  /**
   * Cria uma nova aba para o replay
   */
  private async createReplayTab(
    url: string,
    cacheMode: CacheMode
  ): Promise<chrome.tabs.Tab> {
    // Limpar cache se necessário
    if (cacheMode === CacheMode.CLEAN_CACHE) {
      await this.clearBrowsingData();
    }

    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url, active: true }, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else if (tab) {
          resolve(tab);
        } else {
          reject(new Error('Failed to create tab'));
        }
      });
    });
  }

  /**
   * Aguarda a aba estar pronta
   */
  private async waitForTabReady(tabId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Tab loading timeout'));
      }, this.config?.tabLoadTimeout || 30000);

      const checkTab = () => {
        chrome.tabs.get(tabId, (tab) => {
          if (chrome.runtime.lastError) {
            clearTimeout(timeout);
            reject(chrome.runtime.lastError);
          } else if (tab.status === 'complete') {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(checkTab, 100);
          }
        });
      };

      checkTab();
    });
  }

  /**
   * Injeta o script runner na aba
   */
  private async injectReplayRunner(tabId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ['replayRunner.bundle.js'],
        },
        () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        }
      );
    });
  }

  /**
   * Limpa dados de navegação
   */
  private async clearBrowsingData(): Promise<void> {
    return new Promise((resolve) => {
      chrome.browsingData.remove(
        {
          since: 0,
        },
        {
          cache: true,
          cookies: true,
          localStorage: true,
        },
        () => {
          resolve();
        }
      );
    });
  }

  /**
   * Emite evento de progresso
   */
  private emitProgress(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const progress = {
      sessionId,
      currentActionIndex: session.currentActionIndex,
      totalActions: session.actions.length,
      status: session.status,
      error: session.error,
    };

    this.emitEvent(ReplayEventType.ACTION_EXECUTED, sessionId, { progress });

    // Enviar mensagem para o popup
    chrome.runtime.sendMessage({
      type: ReplayMessageType.REPLAY_PROGRESS,
      progress,
    });
  }

  /**
   * Emite evento interno
   */
  private emitEvent(
    type: ReplayEventType,
    sessionId: string,
    data?: any
  ): void {
    const event: ReplayEvent = {
      type,
      sessionId,
      data,
      timestamp: Date.now(),
    };
    this.eventBus.emit(type, event);
  }

  /**
   * Persiste estado das sessões
   */
  private async persistState(): Promise<void> {
    const state = {
      sessions: Array.from(this.sessions.entries()).map(([id, session]) => ({
        ...session,
      })),
    };

    try {
      await chrome.storage.local.set({ ds_replay_state: state });
    } catch (error) {
      console.error('[ReplayEngine] Error persisting state:', error);
    }
  }

  /**
   * Restaura estado das sessões
   */
  private async restoreState(): Promise<void> {
    try {
      const result = await chrome.storage.local.get('ds_replay_state');
      if (result.ds_replay_state?.sessions) {
        result.ds_replay_state.sessions.forEach((session: ReplaySession) => {
          // Apenas restaurar sessões que estavam em execução ou pausadas
          if (
            session.status === ReplayStatus.RUNNING ||
            session.status === ReplayStatus.PAUSED
          ) {
            this.sessions.set(session.id, session);
          }
        });
      }
    } catch (error) {
      console.error('[ReplayEngine] Error restoring state:', error);
    }
  }

  /**
   * Obtém opções da sessão (para restauração)
   */
  private getSessionOptions(sessionId: string): ReplayOptions {
    // Usa configuração padrão se não tiver config específica da sessão
    return {
      cacheMode: this.config?.defaultCacheMode || CacheMode.KEEP_CACHE,
      autoScroll: this.config?.autoScroll !== false,
      maxRetries: this.config?.maxRetries || 3,
      retryDelay: this.config?.retryDelay || 1000,
      chunkSize: this.config?.chunkSize || 10,
    };
  }

  /**
   * Executa ação de resize diretamente no background
   */
  private async executeResizeAction(action: ResizeAction): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.windows.getCurrent((window) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }

        if (!window.id) {
          reject(new Error('No window ID available'));
          return;
        }

        chrome.windows.update(
          window.id,
          {
            width: action.width,
            height: action.height,
          },
          () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              console.log(
                `[ReplayEngine] Window resized to: ${action.width}x${action.height}`
              );
              resolve();
            }
          }
        );
      });
    });
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
