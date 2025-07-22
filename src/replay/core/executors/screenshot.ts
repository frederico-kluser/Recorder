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
    // Screenshot actions are handled entirely by the background script
    // This executor just logs the action for compatibility
    console.log(
      `[ScreenshotExecutor] Screenshot action at timestamp: ${action.timestamp}`
    );

    // Small delay to simulate action execution
    await this.delay(300);

    // Log the action (screenshot will be captured by background script)
    await this.captureAfter(action);
  }
}
