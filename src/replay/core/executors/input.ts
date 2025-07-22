/**
 * Executor para ações de input
 */

import { InputAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class InputExecutor extends ActionExecutor {
  async execute(action: InputAction, options?: ExecutorOptions): Promise<void> {
    const { selectors, value, isPassword } = action;
    const selector = this.getBestSelector(selectors);
    let retries = options?.maxRetries || 3;

    while (retries > 0) {
      try {
        const element = (await this.waitForElement(
          selector
        )) as HTMLInputElement;
        this.scrollToElement(element, options);

        // Pequeno delay para garantir que o scroll terminou
        await this.delay(300);

        // Focar no elemento
        element.focus();

        // Limpar valor existente
        element.value = '';

        // Simular digitação
        for (const char of value || '') {
          element.value += char;

          // Disparar eventos de input
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));

          // Pequeno delay entre caracteres para simular digitação humana
          await this.delay(50 + Math.random() * 50);
        }

        console.log(
          `[InputExecutor] Typed ${
            isPassword ? '[password]' : value || ''
          } in ${selector}`
        );
        return;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw new Error(`Failed to input in element ${selector}: ${error}`);
        }
        console.warn(
          `[InputExecutor] Retry ${
            options?.maxRetries! - retries
          } for ${selector}`
        );
        await this.delay(1000);
      }
    }
  }
}
