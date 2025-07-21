/**
 * ReplayRunner - Módulo responsável por executar as ações gravadas em nova aba
 * Injeta script na página para reproduzir interações do usuário
 */

import type { Action } from '../../pages/types/index';
import { ActionType } from '../../pages/types/index';
import type { ActionExecutorOptions, ActionExecutionResult, ReplayExecute, ReplayResult } from '../../types/replay';
import { ReplayMode, ReplayMessageType } from '../../types/replay';

// Marca global para identificar que o runner está carregado
declare global {
  interface Window {
    deploysentinel_runner_loaded: boolean;
  }
}

window.deploysentinel_runner_loaded = true;

// Variáveis globais para controlar estado do replay
let currentReplayStep = 0;
let totalReplaySteps = 0;

/**
 * Envia status estruturado para o background
 */
function sendStatusUpdate(status: 'preparing' | 'running' | 'completed' | 'error', error?: string) {
  chrome.runtime.sendMessage({
    type: 'REPLAY_STATUS',
    status,
    currentStep: currentReplayStep,
    totalSteps: totalReplaySteps,
    error
  });
}

/**
 * Envia log para o background
 */
function logToBackground(step: string, status: 'OK' | 'FAIL' | 'INFO' | 'WARN', detail?: string) {
  const message = `[REPLAY-RUNNER] ${status === 'OK' ? '✅' : status === 'FAIL' ? '❌' : status === 'INFO' ? 'ℹ️' : '⚠️'} ${step}${detail ? ` - ${detail}` : ''}`;
  console.log(message, { timestamp: Date.now(), status });
}

/**
 * Executa uma ação de clique no elemento
 */
async function executeClick(selector: string, options: ActionExecutorOptions): Promise<ActionExecutionResult> {
  const startTime = Date.now();
  const { retryAttempts = 3, retryDelay = 500, waitTimeout = 5000 } = options;
  
  logToBackground('executeClick', 'INFO', `Selector: ${selector}`);
  
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      logToBackground('executeClick', 'INFO', `Attempt ${attempt + 1}/${retryAttempts} - Waiting for element`);
      
      // Aguarda elemento aparecer com timeout
      const element = await waitForElement(selector, waitTimeout);
      
      if (!element) {
        throw new Error(`Elemento não encontrado: ${selector}`);
      }
      
      logToBackground('executeClick', 'OK', 'Element found, scrolling into view');
      
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
      
      logToBackground('executeClick', 'OK', `Completed in ${Date.now() - startTime}ms`);
      
      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      
      if (attempt === retryAttempts - 1) {
        logToBackground('executeClick', 'FAIL', errorMsg);
        return {
          success: false,
          error: errorMsg,
          duration: Date.now() - startTime
        };
      }
      
      logToBackground('executeClick', 'WARN', `Attempt ${attempt + 1} failed: ${errorMsg}. Retrying...`);
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
  
  const maskedValue = selector.includes('password') ? '***' : value;
  logToBackground('executeType', 'INFO', `Selector: ${selector}, Value: ${maskedValue}`);
  
  for (let attempt = 0; attempt < retryAttempts; attempt++) {
    try {
      logToBackground('executeType', 'INFO', `Attempt ${attempt + 1}/${retryAttempts} - Waiting for element`);
      
      const element = await waitForElement(selector, waitTimeout) as HTMLInputElement | HTMLTextAreaElement;
      
      if (!element) {
        throw new Error(`Elemento não encontrado: ${selector}`);
      }
      
      logToBackground('executeType', 'OK', 'Element found, focusing');
      
      // Foca no elemento
      element.focus();
      await sleep(50);
      
      // Limpa valor existente
      element.value = '';
      
      logToBackground('executeType', 'INFO', `Typing ${value.length} characters`);
      
      // Digita caractere por caractere para simular usuário real
      for (const char of value) {
        element.value += char;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(20 + Math.random() * 30); // Variação para parecer humano
      }
      
      // Dispara evento change
      element.dispatchEvent(new Event('change', { bubbles: true }));
      
      logToBackground('executeType', 'OK', `Completed in ${Date.now() - startTime}ms`);
      
      return {
        success: true,
        duration: Date.now() - startTime
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
      
      if (attempt === retryAttempts - 1) {
        logToBackground('executeType', 'FAIL', errorMsg);
        return {
          success: false,
          error: errorMsg,
          duration: Date.now() - startTime
        };
      }
      
      logToBackground('executeType', 'WARN', `Attempt ${attempt + 1} failed: ${errorMsg}. Retrying...`);
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
  
  logToBackground('executeNavigate', 'INFO', `Navigating to: ${url}`);
  
  try {
    window.location.href = url;
    
    logToBackground('executeNavigate', 'OK', `Navigation initiated to ${url}`);
    
    return {
      success: true,
      duration: Date.now() - startTime
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro ao navegar';
    logToBackground('executeNavigate', 'FAIL', errorMsg);
    
    return {
      success: false,
      error: errorMsg,
      duration: Date.now() - startTime
    };
  }
}

/**
 * Aguarda elemento aparecer no DOM
 */
async function waitForElement(selector: string, timeout: number): Promise<Element | null> {
  const startTime = Date.now();
  
  logToBackground('waitForElement', 'INFO', `Waiting for: ${selector} (timeout: ${timeout}ms)`);
  
  return new Promise((resolve) => {
    // Tenta encontrar imediatamente
    const element = document.querySelector(selector);
    if (element) {
      logToBackground('waitForElement', 'OK', `Found immediately: ${selector}`);
      resolve(element);
      return;
    }
    
    // Observer para detectar quando elemento aparecer
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        logToBackground('waitForElement', 'OK', `Found after ${Date.now() - startTime}ms: ${selector}`);
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        observer.disconnect();
        logToBackground('waitForElement', 'WARN', `Timeout after ${timeout}ms: ${selector}`);
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
 * Limpa cache do navegador e recarrega a página
 */
async function clearCacheAndReload(): Promise<void> {
  logToBackground('clearCacheAndReload', 'INFO', 'Starting cache cleanup');
  
  try {
    // Limpa localStorage
    if (window.localStorage) {
      const itemCount = window.localStorage.length;
      window.localStorage.clear();
      logToBackground('clearCacheAndReload', 'OK', `Cleared ${itemCount} localStorage items`);
    }
    
    // Limpa sessionStorage
    if (window.sessionStorage) {
      const itemCount = window.sessionStorage.length;
      window.sessionStorage.clear();
      logToBackground('clearCacheAndReload', 'OK', `Cleared ${itemCount} sessionStorage items`);
    }
    
    // Limpa cookies do domínio atual
    if (document.cookie) {
      const cookieCount = document.cookie.split(";").length;
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      logToBackground('clearCacheAndReload', 'OK', `Cleared ${cookieCount} cookies`);
    }
    
    logToBackground('clearCacheAndReload', 'INFO', 'Reloading page without cache');
    
    // Força recarga sem cache
    window.location.reload();
    
    // Aguarda a página recarregar
    await new Promise(resolve => {
      window.addEventListener('load', () => resolve(void 0));
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    logToBackground('clearCacheAndReload', 'FAIL', errorMsg);
    console.error('Erro ao limpar cache:', error);
  }
}

/**
 * Função principal do runner - executada no contexto da página
 */
async function runReplay(message: ReplayExecute): Promise<void> {
  const { actions, initialUrl, mode } = message;
  let completedSteps = 0;
  
  // Inicializa variáveis globais
  currentReplayStep = 0;
  totalReplaySteps = actions.length;
  
  // Valida URL inicial
  if (!initialUrl || initialUrl === 'undefined' || initialUrl === '/undefined/') {
    const errorMsg = 'URL inicial inválida ou não definida';
    logToBackground('runReplay', 'FAIL', errorMsg);
    sendStatusUpdate('error', errorMsg);
    chrome.runtime.sendMessage<ReplayResult>({
      type: 'REPLAY_RESULT',
      success: false,
      error: errorMsg,
      completedSteps: 0
    });
    return;
  }
  
  logToBackground('runReplay', 'INFO', `Starting replay with ${actions.length} actions, mode: ${mode}, initial URL: ${initialUrl}`);
  sendStatusUpdate('preparing');
  
  try {
    // Se modo clean-cache, limpa cache e recarrega primeiro
    if (mode === ReplayMode.CLEAN_CACHE && window.location.href === initialUrl) {
      logToBackground('runReplay', 'INFO', 'Clean cache mode - clearing cache first');
      await clearCacheAndReload();
      // Após reload, não precisa continuar pois a página foi recarregada
      // O script será reinjetado e continuará a partir daqui
      return;
    }
    
    // Navega para URL inicial se diferente
    if (window.location.href !== initialUrl) {
      logToBackground('runReplay', 'INFO', `Current URL differs from initial, navigating from ${window.location.href} to ${initialUrl}`);
      await executeNavigate(initialUrl);
      // Aguarda página carregar completamente
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else {
          window.addEventListener('load', () => resolve(void 0));
        }
      });
      
      // Se modo clean-cache e acabou de navegar, limpa cache e recarrega
      if (mode === ReplayMode.CLEAN_CACHE) {
        logToBackground('runReplay', 'INFO', 'Clean cache mode after navigation - clearing cache');
        await clearCacheAndReload();
        return;
      }
    }
    
    logToBackground('runReplay', 'INFO', 'Starting action execution loop');
    
    // Executa cada ação respeitando delays
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const nextAction = actions[i + 1];
      
      // Calcula delay até próxima ação
      const delay = nextAction 
        ? nextAction.timestamp - action.timestamp 
        : 500; // Delay padrão para última ação
      
      logToBackground('runReplay', 'INFO', `Executing action ${i + 1}/${actions.length}: ${action.type}`);
      
      // Executa ação baseada no tipo
      let result: ActionExecutionResult;
      
      // Get the first available selector
      const selector = action.selectors ? Object.values(action.selectors).find(s => s !== null) || '' : '';
      
      switch (action.type) {
        case ActionType.Click:
          logToBackground('runReplay', 'INFO', `Action ${i + 1}: Click on ${selector}`);
          result = await executeClick(selector, {});
          break;
          
        case ActionType.Input:
          const maskedValue = selector.includes('password') ? '***' : action.value || '';
          logToBackground('runReplay', 'INFO', `Action ${i + 1}: Type '${maskedValue}' in ${selector}`);
          result = await executeType(selector, action.value || '', {});
          break;
          
        case ActionType.Navigate:
          const navAction = action as any; // Type assertion for NavigateAction
          logToBackground('runReplay', 'INFO', `Action ${i + 1}: Navigate to ${navAction.url}`);
          result = await executeNavigate(navAction.url || '');
          break;
          
        default:
          logToBackground('runReplay', 'WARN', `Action ${i + 1}: Unsupported type ${action.type}`);
          result = { success: false, error: `Tipo de ação não suportado: ${action.type}` };
      }
      
      if (!result.success) {
        logToBackground('runReplay', 'FAIL', `Action ${i + 1} failed: ${result.error}`);
        throw new Error(`Falha na ação ${i + 1}: ${result.error}`);
      }
      
      completedSteps++;
      
      // Atualiza progresso
      currentReplayStep = i + 1;
      sendStatusUpdate('running');
      
      // Aguarda delay natural entre ações
      const actualDelay = Math.min(delay, 3000);
      logToBackground('runReplay', 'INFO', `Action ${i + 1} completed successfully. Waiting ${actualDelay}ms before next action`);
      await sleep(actualDelay); // Máximo 3 segundos entre ações
    }
    
    logToBackground('runReplay', 'OK', `All ${actions.length} actions completed successfully`);
    
    // Envia status de conclusão
    sendStatusUpdate('completed');
    
    // Envia resultado de sucesso
    chrome.runtime.sendMessage<ReplayResult>({
      type: 'REPLAY_RESULT',
      success: true,
      completedSteps
    });
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    logToBackground('runReplay', 'FAIL', `Replay failed after ${completedSteps} steps: ${errorMsg}`);
    
    // Envia status de erro
    sendStatusUpdate('error', errorMsg);
    
    // Envia resultado de erro
    chrome.runtime.sendMessage<ReplayResult>({
      type: 'REPLAY_RESULT',
      success: false,
      error: errorMsg,
      completedSteps
    });
  }
}

// Notifica o background que o runner está pronto
logToBackground('ReplayRunner', 'INFO', 'Replay runner loaded and ready');
chrome.runtime.sendMessage({ type: ReplayMessageType.RUNNER_READY });

// Listener para mensagens do background
chrome.runtime.onMessage.addListener((message: any) => {
  logToBackground('ReplayRunner', 'INFO', `Received message: ${message.type}`);
  
  if (message.type === 'REPLAY_EXECUTE') {
    logToBackground('ReplayRunner', 'INFO', 'Starting replay execution');
    runReplay(message as ReplayExecute);
  } else if (message.type === 'REPLAY_STOP') {
    logToBackground('ReplayRunner', 'WARN', 'Received stop command - reloading page');
    window.location.reload();
  }
});

// Exporta para testes
export { executeClick, executeType, executeNavigate, waitForElement };