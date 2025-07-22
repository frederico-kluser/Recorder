/**
 * Executor para ações de scroll
 */

import { ScrollAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class ScrollExecutor extends ActionExecutor {
  async execute(
    action: ScrollAction,
    options?: ExecutorOptions
  ): Promise<void> {
    const { x, y } = action;

    try {
      // Executar scroll suave
      window.scrollTo({
        left: x,
        top: y,
        behavior: 'smooth',
      });

      console.log(`[ScrollExecutor] Scrolled to position: ${x}, ${y}`);

      // Aguardar o scroll terminar
      await this.delay(500);
    } catch (error) {
      throw new Error(`Failed to scroll: ${error}`);
    }
  }
}
