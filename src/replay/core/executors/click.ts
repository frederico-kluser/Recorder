/**
 * Executor para ações de clique
 */

import { ClickAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class ClickExecutor extends ActionExecutor {
  async execute(action: ClickAction, options?: ExecutorOptions): Promise<void> {
    const { x, y } = action;

    // Coletar todos os seletores disponíveis
    const selectors: string[] = [];

    // Adicionar selector direto se existir
    if (action.selector) {
      selectors.push(action.selector);
    }

    // Adicionar seletores da estrutura selectors
    if (action.selectors) {
      // Ordem de prioridade
      if (action.selectors.testIdSelector)
        selectors.push(action.selectors.testIdSelector);
      if (action.selectors.id) selectors.push(`#${action.selectors.id}`);
      if (action.selectors.attrSelector)
        selectors.push(action.selectors.attrSelector);
      if (action.selectors.generalSelector)
        selectors.push(action.selectors.generalSelector);

      // Adicionar outros seletores não nulos
      Object.entries(action.selectors).forEach(([key, value]) => {
        if (
          value &&
          !['testIdSelector', 'id', 'attrSelector', 'generalSelector'].includes(
            key
          )
        ) {
          selectors.push(value);
        }
      });
    }

    if (selectors.length === 0) {
      throw new Error('No selectors found in action');
    }

    console.log(`[ClickExecutor] Found ${selectors.length} selectors to try`);

    // Tentar cada seletor
    const errors: string[] = [];

    for (let i = 0; i < selectors.length; i++) {
      const selector = selectors[i];
      console.log(
        `[ClickExecutor] Trying selector ${i + 1}/${
          selectors.length
        }: ${selector}`
      );

      let retries = options?.maxRetries || 3;

      while (retries > 0) {
        try {
          const element = await this.waitForElement(selector);
          console.log(
            `[ClickExecutor] Element found with selector: ${selector}`
          );

          this.scrollToElement(element, options);

          // Pequeno delay para garantir que o scroll terminou
          await this.delay(300);

          // Criar e disparar evento de clique
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: x,
            clientY: y,
          });

          element.dispatchEvent(clickEvent);
          console.log(
            `[ClickExecutor] Successfully clicked on element using selector: ${selector}`
          );
          return;
        } catch (error) {
          retries--;
          if (retries === 0) {
            const errorMsg = `Failed with selector "${selector}": ${error}`;
            errors.push(errorMsg);
            console.warn(`[ClickExecutor] ${errorMsg}`);
            break; // Tentar próximo seletor
          }
          console.warn(
            `[ClickExecutor] Retry ${
              options?.maxRetries! - retries
            } for selector: ${selector}`
          );
          await this.delay(1000);
        }
      }
    }

    // Se chegou aqui, todos os seletores falharam
    throw new Error(
      `Failed to click element. Tried ${
        selectors.length
      } selectors:\n${errors.join('\n')}`
    );
  }
}
