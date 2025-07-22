/**
 * Executor para ações de clique
 */

import { ClickAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class ClickExecutor extends ActionExecutor {
  async execute(action: ClickAction, options?: ExecutorOptions): Promise<void> {
    const { selector, x, y } = action;
    let retries = options?.maxRetries || 3;

    while (retries > 0) {
      try {
        const element = await this.waitForElement(selector);
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
        console.log(`[ClickExecutor] Clicked on element: ${selector}`);
        return;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw new Error(`Failed to click element ${selector}: ${error}`);
        }
        console.warn(
          `[ClickExecutor] Retry ${
            options?.maxRetries! - retries
          } for ${selector}`
        );
        await this.delay(1000);
      }
    }
  }
}
