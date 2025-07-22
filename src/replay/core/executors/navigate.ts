/**
 * Executor para ações de navegação
 */

import { NavigateAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class NavigateExecutor extends ActionExecutor {
  async execute(
    action: NavigateAction,
    options?: ExecutorOptions
  ): Promise<void> {
    const { url } = action;

    try {
      // Navegar para a URL
      window.location.href = url;

      console.log(`[NavigateExecutor] Navigating to: ${url}`);

      // Aguardar um pouco para a navegação iniciar
      await this.delay(1000);

      // Capture screenshot after navigation
      await this.captureAfter(action);
    } catch (error) {
      throw new Error(`Failed to navigate to ${url}: ${error}`);
    }
  }
}
