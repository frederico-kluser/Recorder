/**
 * Replay Runner - Script injetado na página para executar ações
 * Este script recebe mensagens do background e executa as ações na página
 */

import { Action, ActionType } from '../pages/types/index';
import { ActionExecutorFactory } from '../replay/core/executors/factory';

interface ExecuteActionMessage {
  type: 'EXECUTE_ACTION';
  action: Action;
  options: {
    maxRetries?: number;
    autoScroll?: boolean;
  };
}

// Factory para criar executors
const executorFactory = new ActionExecutorFactory();

// Listener para mensagens do background
chrome.runtime.onMessage.addListener(
  (message: ExecuteActionMessage, sender, sendResponse) => {
    if (message.type !== 'EXECUTE_ACTION') {
      return;
    }

    const { action, options } = message;
    console.log('[ReplayRunner] Executando ação:', action.type);

    // Obter executor para o tipo de ação
    const executor = executorFactory.getExecutor(action);

    if (!executor) {
      console.error(
        '[ReplayRunner] Executor não encontrado para:',
        action.type
      );
      sendResponse({ error: `Unsupported action type: ${action.type}` });
      return;
    }

    // Executar ação
    executor
      .execute(action, options)
      .then(() => {
        console.log('[ReplayRunner] Ação executada com sucesso:', action.type);
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('[ReplayRunner] Erro ao executar ação:', error);
        sendResponse({ error: error.message });
      });

    // Indica que a resposta será enviada de forma assíncrona
    return true;
  }
);

// Notificar que o runner está pronto
console.log('[ReplayRunner] Runner inicializado e pronto para executar ações');

// Expor globalmente para debugging
(window as any).__replayRunner = {
  version: '1.0.0',
  ready: true,
  executorFactory,
};
