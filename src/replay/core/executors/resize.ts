/**
 * Executor para ações de redimensionamento
 */

import { ResizeAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class ResizeExecutor extends ActionExecutor {
  async execute(
    action: ResizeAction,
    options?: ExecutorOptions
  ): Promise<void> {
    const { width, height } = action;

    try {
      // Enviar mensagem para o background script redimensionar a janela
      await this.sendMessageToBackground({
        type: 'RESIZE_WINDOW',
        width,
        height,
      });

      console.log(`[ResizeExecutor] Resized window to: ${width}x${height}`);

      // Aguardar o redimensionamento
      await this.delay(500);
    } catch (error) {
      throw new Error(`Failed to resize window: ${error}`);
    }
  }

  private sendMessageToBackground(message: any): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }
}
