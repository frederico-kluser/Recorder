/**
 * ReplayRunner - Módulo responsável por executar as ações gravadas em nova aba
 * Injeta script na página para reproduzir interações do usuário
 */

import type { Action } from '../../pages/types/index';
import { ActionType } from '../../pages/types/index';
import type { ActionExecutorOptions, ActionExecutionResult, ReplayExecute, ReplayResult } from '../../types/replay';

/**
 * Executa uma ação de clique no elemento
 */
async function executeClick(selector: string, options: ActionExecutorOptions): Promise<ActionExecutionResult> {
  const startTime = Date.now();
  const { retryAttempts = 3, retryDelay = 500, waitTimeout = 5000 } = options;
  
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      // Aguarda elemento aparecer com timeout
      const element = await waitForElement(selector, waitTimeout);
      
      if (!element) {
        throw new Error(`Elemento não encontrado: ${selector}`);
      }
      
      // Scroll até elemento se necessário
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(100);
      
      // Simula clique real
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      element.dispatchEvent(clickEvent);
      
      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      if (attempt === retryAttempts - 1) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          duration: Date.now() - startTime
        };
      }
      await sleep(retryDelay);
    }
  }
  
  return {
    success: false,
    error: 'Máximo de tentativas excedido',
    duration: Date.now() - startTime
  };
}

/**
 * Executa uma ação de digitação em input
 */
async function executeType(selector: string, value: string, options: ActionExecutorOptions): Promise<ActionExecutionResult> {
  const startTime = Date.now();
  const { retryAttempts = 3, retryDelay = 500, waitTimeout = 5000 } = options;
  
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      const element = await waitForElement(selector, waitTimeout) as HTMLInputElement | HTMLTextAreaElement;
      
      if (!element) {
        throw new Error(`Elemento não encontrado: ${selector}`);
      }
      
      // Foca no elemento
      element.focus();
      await sleep(50);
      
      // Limpa valor existente
      element.value = '';
      
      // Digita caractere por caractere para simular usuário real
      for (const char of value) {
        element.value += char;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(20 + Math.random() * 30); // Variação para parecer humano
      }
      
      // Dispara evento change
      element.dispatchEvent(new Event('change', { bubbles: true }));
      
      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      if (attempt === retryAttempts - 1) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Erro desconhecido',
          duration: Date.now() - startTime
        };
      }
      await sleep(retryDelay);
    }
  }
  
  return {
    success: false,
    error: 'Máximo de tentativas excedido',
    duration: Date.now() - startTime
  };
}

/**
 * Executa navegação para nova URL
 */
async function executeNavigate(url: string): Promise<ActionExecutionResult> {
  const startTime = Date.now();
  
  try {
    window.location.href = url;
    
    return {
      success: true,
      duration: Date.now() - startTime
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro ao navegar',
      duration: Date.now() - startTime
    };
  }
}

/**
 * Aguarda elemento aparecer no DOM
 */
async function waitForElement(selector: string, timeout: number): Promise<Element | null> {
  const startTime = Date.now();
  
  return new Promise((resolve) => {
    // Tenta encontrar imediatamente
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    
    // Observer para detectar quando elemento aparecer
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        observer.disconnect();
        resolve(null);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Timeout fallback
    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

/**
 * Aguarda tempo especificado
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função principal do runner - executada no contexto da página
 */
async function runReplay(message: ReplayExecute): Promise<void> {
  const { actions, initialUrl } = message;
  let completedSteps = 0;
  
  try {
    // Navega para URL inicial se diferente
    if (window.location.href !== initialUrl) {
      await executeNavigate(initialUrl);
      // Aguarda página carregar completamente
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else {
          window.addEventListener('load', () => resolve(void 0));
        }
      });
    }
    
    // Executa cada ação respeitando delays
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const nextAction = actions[i + 1];
      
      // Calcula delay até próxima ação
      const delay = nextAction 
        ? nextAction.timestamp - action.timestamp 
        : 500; // Delay padrão para última ação
      
      // Executa ação baseada no tipo
      let result: ActionExecutionResult;
      
      // Get the first available selector
      const selector = action.selectors ? Object.values(action.selectors).find(s => s !== null) || '' : '';
      
      switch (action.type) {
        case ActionType.Click:
          result = await executeClick(selector, {});
          break;
          
        case ActionType.Input:
          result = await executeType(selector, action.value || '', {});
          break;
          
        case ActionType.Navigate:
          const navAction = action as any; // Type assertion for NavigateAction
          result = await executeNavigate(navAction.url || '');
          break;
          
        default:
          result = { success: false, error: `Tipo de ação não suportado: ${action.type}` };
      }
      
      if (!result.success) {
        throw new Error(`Falha na ação ${i + 1}: ${result.error}`);
      }
      
      completedSteps++;
      
      // Aguarda delay natural entre ações
      await sleep(Math.min(delay, 3000)); // Máximo 3 segundos entre ações
    }
    
    // Envia resultado de sucesso
    chrome.runtime.sendMessage<ReplayResult>({
      type: 'REPLAY_RESULT',
      success: true,
      completedSteps
    });
    
  } catch (error) {
    // Envia resultado de erro
    chrome.runtime.sendMessage<ReplayResult>({
      type: 'REPLAY_RESULT',
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      completedSteps
    });
  }
}

// Listener para mensagens do background
chrome.runtime.onMessage.addListener((message: any) => {
  if (message.type === 'REPLAY_EXECUTE') {
    runReplay(message as ReplayExecute);
  }
});

// Exporta para testes
export { executeClick, executeType, executeNavigate, waitForElement };