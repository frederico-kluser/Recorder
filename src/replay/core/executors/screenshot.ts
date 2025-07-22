/**
 * Executor para ações de screenshot
 */

import { ScreenshotAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class ScreenshotExecutor extends ActionExecutor {
  async execute(
    action: ScreenshotAction,
    options?: ExecutorOptions
  ): Promise<void> {
    try {
      // Enviar mensagem para o background script capturar screenshot
      await this.sendMessageToBackground({
        type: 'CAPTURE_SCREENSHOT',
        timestamp: action.timestamp,
      });

      console.log(
        `[ScreenshotExecutor] Screenshot captured at timestamp: ${action.timestamp}`
      );

      // Pequeno delay
      await this.delay(300);

      // Capture screenshot after screenshot action (for execution log)
      await this.captureAfter(action);
    } catch (error) {
      throw new Error(`Failed to capture screenshot: ${error}`);
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
