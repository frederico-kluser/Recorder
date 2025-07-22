/**
 * Interface base para executors de ações
 */

import { Action } from '../../../pages/types/index';
import { ExecutionLog } from '../../types/session';
// Screenshot service removed - screenshots are captured in background script only

export interface ExecutorOptions {
  maxRetries?: number;
  autoScroll?: boolean;
}

export abstract class ActionExecutor {
  protected executionLogs: ExecutionLog[] = [];
  protected tabId?: number;

  /**
   * Executa uma ação no contexto da página
   */
  abstract execute(action: Action, options?: ExecutorOptions): Promise<void>;

  /**
   * Obtém o melhor seletor disponível dos selectors fornecidos
   */
  protected getBestSelector(selectors: {
    [key: string]: string | null;
  }): string {
    // Ordem de preferência: testIdSelector, id, attrSelector, generalSelector
    if (selectors.testIdSelector) return selectors.testIdSelector;
    if (selectors.id) return `#${selectors.id}`;
    if (selectors.attrSelector) return selectors.attrSelector;
    if (selectors.generalSelector) return selectors.generalSelector;

    // Fallback: procurar qualquer seletor não nulo
    const anySelector = Object.values(selectors).find((s) => s && s !== null);
    if (anySelector) return anySelector as string;

    // Se nenhum seletor estiver disponível, lança erro
    throw new Error('No valid selector found');
  }

  /**
   * Aguarda um elemento aparecer na página
   */
  protected async waitForElement(
    selector: string,
    timeout: number = 5000
  ): Promise<Element> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const element = document.querySelector(selector);
      if (element) {
        return element;
      }
      await this.delay(100);
    }

    throw new Error(`Element not found: ${selector}`);
  }

  /**
   * Rola até o elemento se necessário
   */
  protected scrollToElement(element: Element, options?: ExecutorOptions): void {
    if (options?.autoScroll !== false) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Helper para delay
   */
  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Captura screenshot após execução da ação
   * NOTE: Screenshots are now captured in the background script only
   * This method is kept for backward compatibility but does nothing
   */
  protected async captureAfter(action: Action): Promise<void> {
    // Screenshots are captured in the background script after action execution
    // This prevents "Could not establish connection" errors
    const executionLog: ExecutionLog = {
      ts: Date.now(),
      action,
      screenshot: '', // Screenshot will be added by background script
    };
    this.executionLogs.push(executionLog);
  }

  /**
   * Set the tab ID for screenshot capture
   */
  setTabId(tabId: number): void {
    this.tabId = tabId;
  }

  /**
   * Get execution logs
   */
  getExecutionLogs(): ExecutionLog[] {
    return this.executionLogs;
  }

  /**
   * Clear execution logs
   */
  clearExecutionLogs(): void {
    this.executionLogs = [];
  }
}
