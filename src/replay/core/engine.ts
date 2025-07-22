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
import { screenshotService } from './services/screenshot-service';
import { ExecutionLog } from '../types/session';

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
        recordingId,
        actions: recording.actions,
        startedAt: Date.now(),
        status: ReplayStatus.IDLE,
        currentActionIndex: 0,
        executionLogs: [],
      };

      this.sessions.set(session.id, session);

      // Aplicar tamanho inicial da janela se houver ação de resize no início
      const firstResizeAction = recording.actions.find(
        (action) => action.type === ActionType.Resize
      );
      if (
        firstResizeAction &&
        'width' in firstResizeAction &&
        'height' in firstResizeAction
      ) {
        console.log(
          '[ReplayEngine] Aplicando tamanho inicial da janela:',
          `${firstResizeAction.width}x${firstResizeAction.height}`
        );
        await this.executeResizeAction(firstResizeAction as ResizeAction);
      }

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
      this.executeActions(session.id, options, recordingId);

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

    // Save final execution logs if recording ID is available
    const recordingId = session.recordingId;
    if (recordingId && session.executionLogs.length > 0) {
      console.log('[ReplayEngine] Salvando logs de execução finais...');
      await this.saveExecutionLogs(sessionId, recordingId);
    }

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
    options: ReplayOptions,
    recordingId?: string
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session || !session.tabId) return;

    // Rastrear se já aplicamos o resize inicial
    let initialResizeApplied = false;
    const firstResizeAction = session.actions.find(
      (action) => action.type === ActionType.Resize
    );
    if (firstResizeAction) {
      initialResizeApplied = true;
    }

    try {
      while (
        session.currentActionIndex < session.actions.length &&
        session.status === ReplayStatus.RUNNING
      ) {
        const action = session.actions[session.currentActionIndex];

        // Pular a primeira ação de resize se já foi aplicada no início
        if (
          initialResizeApplied &&
          action.type === ActionType.Resize &&
          action === firstResizeAction
        ) {
          console.log(
            '[ReplayEngine] Pulando primeira ação de resize (já aplicada)'
          );
          session.currentActionIndex++;
          continue;
        }

        console.log(
          `[ReplayEngine] Executando ação ${session.currentActionIndex + 1}/${
            session.actions.length
          }: ${action.type}`
        );

        try {
          // Executar ação via mensagem para o runner
          await this.executeAction(
            session.tabId,
            action,
            options,
            sessionId,
            recordingId
          );

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
    options: ReplayOptions,
    sessionId: string,
    recordingId?: string
  ): Promise<void> {
    console.log(
      `[ReplayEngine] executeAction iniciado - Tipo: ${action.type}, TabId: ${tabId}`
    );

    // Tratar ação de resize diretamente no background
    if (action.type === ActionType.Resize) {
      console.log(
        '[ReplayEngine] Executando resize action diretamente no background'
      );
      await this.executeResizeAction(action as any);

      // Capture screenshot after resize
      await this.captureBackgroundActionScreenshot(
        tabId,
        action,
        sessionId,
        recordingId
      );

      return;
    }

    // Tratar ação de load diretamente no background
    if (action.type === ActionType.Load) {
      console.log(
        '[ReplayEngine] Executando load action diretamente no background'
      );
      await this.executeLoadAction(tabId, action as any);

      // Capture screenshot after load
      await this.captureBackgroundActionScreenshot(
        tabId,
        action,
        sessionId,
        recordingId
      );

      return;
    }

    // Verificar se a tab existe e está ativa
    try {
      const tab = await chrome.tabs.get(tabId);
      console.log(
        `[ReplayEngine] Estado da tab: ${JSON.stringify({
          id: tab.id,
          status: tab.status,
          url: tab.url,
          active: tab.active,
        })}`
      );
    } catch (error) {
      console.error('[ReplayEngine] Erro ao verificar tab:', error);
      throw new Error(`Tab ${tabId} não encontrada`);
    }

    return new Promise(async (resolve, reject) => {
      // Tentar enviar a mensagem com retry se o content script não estiver pronto
      let lastError: Error | null = null;
      const maxConnectionRetries = 3;

      for (let retry = 1; retry <= maxConnectionRetries; retry++) {
        console.log(
          `[ReplayEngine] Tentativa ${retry}/${maxConnectionRetries} de enviar ação ${action.type}`
        );

        try {
          const result = await new Promise<void>(
            (innerResolve, innerReject) => {
              const timeout = setTimeout(() => {
                console.error(
                  `[ReplayEngine] Timeout ao executar ação: ${action.type}`
                );
                innerReject(new Error(`Action timeout: ${action.type}`));
              }, this.config?.actionTimeout || 30000);

              console.log(
                `[ReplayEngine] Enviando mensagem para content script - Ação: ${action.type}`
              );
              console.log(
                `[ReplayEngine] Detalhes da ação:`,
                JSON.stringify(action, null, 2)
              );

              chrome.tabs.sendMessage(
                tabId,
                {
                  type: 'EXECUTE_ACTION',
                  action,
                  options: {
                    maxRetries:
                      options.maxRetries || this.config?.maxRetries || 3,
                    autoScroll:
                      options.autoScroll !== false &&
                      this.config?.autoScroll !== false,
                  },
                  tabId,
                },
                (response) => {
                  clearTimeout(timeout);

                  if (chrome.runtime.lastError) {
                    const errorMessage =
                      chrome.runtime.lastError.message || 'Unknown error';
                    console.error(
                      '[ReplayEngine] chrome.runtime.lastError:',
                      errorMessage
                    );

                    if (
                      errorMessage.includes('Could not establish connection')
                    ) {
                      console.error(
                        '[ReplayEngine] Content script não está pronto, tentando reinjetar...'
                      );
                      innerReject(new Error('CONNECTION_ERROR'));
                    } else {
                      innerReject(chrome.runtime.lastError);
                    }
                  } else if (response?.error) {
                    console.error(
                      '[ReplayEngine] Erro na resposta do content script:',
                      response.error
                    );
                    innerReject(new Error(response.error));
                  } else {
                    console.log(
                      '[ReplayEngine] Ação executada com sucesso pelo content script:',
                      action.type
                    );
                    console.log('[ReplayEngine] Resposta:', response);

                    // Add execution logs to session
                    if (
                      response?.executionLogs &&
                      Array.isArray(response.executionLogs)
                    ) {
                      const session = this.sessions.get(sessionId);
                      if (session) {
                        session.executionLogs.push(...response.executionLogs);
                        // Save execution logs to recording store
                        this.saveExecutionLogs(sessionId, recordingId);
                      }
                    }

                    // Capture screenshot after successful action execution
                    this.captureActionScreenshot(
                      tabId,
                      action,
                      sessionId,
                      recordingId
                    )
                      .then(() => {
                        console.log(
                          `[ReplayEngine] Screenshot capturado para ação: ${action.type}`
                        );
                      })
                      .catch((error) => {
                        console.error(
                          `[ReplayEngine] Erro ao capturar screenshot para ação ${action.type}:`,
                          error
                        );
                      });

                    innerResolve();
                  }
                }
              );
            }
          );

          // Se chegou aqui, sucesso!
          resolve();
          return;
        } catch (error: any) {
          lastError = error;

          if (
            error.message === 'CONNECTION_ERROR' &&
            retry < maxConnectionRetries
          ) {
            console.log(
              '[ReplayEngine] Tentando reinjetar o content script...'
            );
            try {
              await this.injectReplayRunner(tabId);
              console.log(
                '[ReplayEngine] Content script reinjetado, tentando novamente...'
              );
              await this.delay(500); // Pequeno delay após reinjeção
            } catch (injectError) {
              console.error(
                '[ReplayEngine] Erro ao reinjetar script:',
                injectError
              );
            }
          } else if (error.message !== 'CONNECTION_ERROR') {
            // Se não for erro de conexão, falhar imediatamente
            reject(error);
            return;
          }
        }
      }

      // Se chegou aqui, todas as tentativas falharam
      console.error(
        '[ReplayEngine] Todas as tentativas de executar a ação falharam'
      );
      reject(
        lastError || new Error('Failed to execute action after all retries')
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
   * Verifica se o content script está pronto
   */
  private async verifyContentScriptReady(
    tabId: number,
    maxAttempts = 10
  ): Promise<boolean> {
    console.log(
      `[ReplayEngine] Verificando se content script está pronto na tab ${tabId}...`
    );

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(
          `[ReplayEngine] Tentativa ${attempt}/${maxAttempts} de verificar content script`
        );

        const response = await new Promise<any>((resolve, reject) => {
          const timeout = setTimeout(() => {
            resolve(null);
          }, 1000);

          chrome.tabs.sendMessage(tabId, { type: 'PING' }, (response) => {
            clearTimeout(timeout);
            if (chrome.runtime.lastError) {
              console.log(
                `[ReplayEngine] Tentativa ${attempt} falhou:`,
                chrome.runtime.lastError.message
              );
              resolve(null);
            } else {
              resolve(response);
            }
          });
        });

        if (response && response.type === 'PONG') {
          console.log('[ReplayEngine] Content script está pronto!');
          return true;
        }
      } catch (error) {
        console.log(`[ReplayEngine] Erro na tentativa ${attempt}:`, error);
      }

      if (attempt < maxAttempts) {
        console.log(
          '[ReplayEngine] Aguardando 500ms antes da próxima tentativa...'
        );
        await this.delay(500);
      }
    }

    console.error(
      '[ReplayEngine] Content script não respondeu após todas as tentativas'
    );
    return false;
  }

  /**
   * Injeta o script runner na aba
   */
  private async injectReplayRunner(tabId: number): Promise<void> {
    console.log(
      `[ReplayEngine] Iniciando injeção do replayRunner.bundle.js na tab ${tabId}`
    );

    return new Promise((resolve, reject) => {
      chrome.scripting.executeScript(
        {
          target: { tabId },
          files: ['replayRunner.bundle.js'],
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error(
              '[ReplayEngine] Erro ao injetar script:',
              chrome.runtime.lastError.message
            );
            console.error(
              '[ReplayEngine] Possíveis causas: CSP restritiva, página não carregada, permissões insuficientes'
            );
            reject(chrome.runtime.lastError);
          } else {
            console.log('[ReplayEngine] Script injetado com sucesso');
            console.log('[ReplayEngine] Resultado da injeção:', results);

            // Verificar se o script está pronto
            console.log(
              '[ReplayEngine] Verificando se o script está pronto...'
            );
            this.verifyContentScriptReady(tabId)
              .then((isReady) => {
                if (isReady) {
                  console.log('[ReplayEngine] Script confirmado como pronto');
                  resolve();
                } else {
                  console.error(
                    '[ReplayEngine] Script não respondeu após injeção'
                  );
                  reject(new Error('Content script não está respondendo'));
                }
              })
              .catch(reject);
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
      // Verificar se a API browsingData está disponível
      if (!chrome.browsingData) {
        console.warn(
          '[ReplayEngine] browsingData API não disponível, pulando limpeza'
        );
        resolve();
        return;
      }

      try {
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
            if (chrome.runtime.lastError) {
              console.warn(
                '[ReplayEngine] Erro ao limpar dados:',
                chrome.runtime.lastError
              );
            }
            resolve();
          }
        );
      } catch (error) {
        console.warn(
          '[ReplayEngine] Erro ao chamar browsingData.remove:',
          error
        );
        resolve();
      }
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
   * Executa ação de load (navegação) diretamente no background
   */
  private async executeLoadAction(tabId: number, action: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(
        `[ReplayEngine] executeLoadAction iniciado - URL: ${action.url}`
      );

      // Atualizar a URL da aba
      chrome.tabs.update(tabId, { url: action.url }, (tab) => {
        if (chrome.runtime.lastError) {
          console.error(
            '[ReplayEngine] Erro ao navegar:',
            chrome.runtime.lastError.message
          );
          reject(chrome.runtime.lastError);
          return;
        }

        console.log(
          '[ReplayEngine] Navegação iniciada, aguardando carregamento completo...'
        );

        // Aguardar a aba carregar completamente
        const listener = (
          tabIdUpdated: number,
          changeInfo: chrome.tabs.TabChangeInfo
        ) => {
          console.log(`[ReplayEngine] Tab ${tabIdUpdated} mudou:`, changeInfo);

          if (tabIdUpdated === tabId && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            console.log(
              `[ReplayEngine] Página carregada completamente: ${action.url}`
            );

            // Aguardar um pouco mais para garantir que os scripts foram injetados
            console.log(
              '[ReplayEngine] Aguardando 1000ms antes de re-injetar o script...'
            );
            setTimeout(() => {
              console.log(
                '[ReplayEngine] Re-injetando replay runner após navegação...'
              );
              // Re-injetar o replay runner após navegação
              this.injectReplayRunner(tabId)
                .then(() => {
                  console.log(
                    '[ReplayEngine] Script re-injetado com sucesso após navegação'
                  );
                  resolve();
                })
                .catch((error) => {
                  console.error(
                    '[ReplayEngine] Erro ao re-injetar script:',
                    error
                  );
                  reject(error);
                });
            }, 1000);
          }
        };

        chrome.tabs.onUpdated.addListener(listener);

        // Timeout de segurança
        const timeoutMs = this.config?.tabLoadTimeout || 30000;
        console.log(
          `[ReplayEngine] Timeout de segurança definido para ${timeoutMs}ms`
        );
        setTimeout(() => {
          console.warn(
            '[ReplayEngine] Timeout alcançado, removendo listener e continuando...'
          );
          chrome.tabs.onUpdated.removeListener(listener);
          resolve(); // Resolver mesmo com timeout para continuar o replay
        }, timeoutMs);
      });
    });
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Save execution logs to recording store
   */
  private async saveExecutionLogs(
    sessionId: string,
    recordingId?: string
  ): Promise<void> {
    if (!recordingId) return;

    const session = this.sessions.get(sessionId);
    if (!session || !session.executionLogs.length) return;

    try {
      const recording = await recordingStore.get(recordingId);
      if (recording) {
        await recordingStore.updateExecutionLogs(
          recordingId,
          session.executionLogs
        );
      }
    } catch (error) {
      console.error('[ReplayEngine] Error saving execution logs:', error);
    }
  }

  /**
   * Capture screenshot for actions executed in background
   */
  private async captureBackgroundActionScreenshot(
    tabId: number,
    action: Action,
    sessionId: string,
    recordingId?: string
  ): Promise<void> {
    try {
      const screenshot = await screenshotService.capture(tabId);
      const executionLog: ExecutionLog = {
        ts: Date.now(),
        action,
        screenshot,
      };

      const session = this.sessions.get(sessionId);
      if (session) {
        session.executionLogs.push(executionLog);
        await this.saveExecutionLogs(sessionId, recordingId);
      }
    } catch (error) {
      console.error(
        '[ReplayEngine] Error capturing screenshot for background action:',
        error
      );
    }
  }

  /**
   * Capture screenshot for actions executed in content script
   */
  private async captureActionScreenshot(
    tabId: number,
    action: Action,
    sessionId: string,
    recordingId?: string
  ): Promise<void> {
    try {
      // Add a small delay to ensure the action's visual effect is rendered
      await this.delay(200);

      const screenshot = await screenshotService.capture(tabId);
      const executionLog: ExecutionLog = {
        ts: Date.now(),
        action,
        screenshot,
      };

      const session = this.sessions.get(sessionId);
      if (session) {
        session.executionLogs.push(executionLog);
        await this.saveExecutionLogs(sessionId, recordingId);
      }
    } catch (error) {
      console.error(
        '[ReplayEngine] Error capturing screenshot for action:',
        error
      );
    }
  }
}
