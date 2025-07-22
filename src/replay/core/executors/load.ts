/**
 * Executor para ações de load (carregamento de página)
 */

import { LoadAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class LoadExecutor extends ActionExecutor {
  async execute(action: LoadAction, options?: ExecutorOptions): Promise<void> {
    const { url } = action;

    try {
      // Verificar se já estamos na URL correta
      if (window.location.href === url) {
        console.log(`[LoadExecutor] Already at URL: ${url}`);

        // Capture screenshot even if already at URL
        await this.captureAfter(action);

        return;
      }

      // Navegar para a URL
      window.location.href = url;

      console.log(`[LoadExecutor] Loading URL: ${url}`);

      // Aguardar um pouco para o carregamento iniciar
      await this.delay(1000);

      // Capture screenshot after load
      await this.captureAfter(action);
    } catch (error) {
      throw new Error(`Failed to load URL ${url}: ${error}`);
    }
  }
}
