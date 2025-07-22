/**
 * Executor para ações de navegação
 */

import { NavigateAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class NavigateExecutor extends ActionExecutor {
  private readonly DEFAULT_MOBILE_VIEWPORT = { width: 375, height: 667 };
  private readonly DEFAULT_DESKTOP_VIEWPORT = { width: 1280, height: 800 };

  async execute(
    action: NavigateAction,
    options?: ExecutorOptions
  ): Promise<void> {
    const { url } = action;

    try {
      // Set viewport before navigation based on configuration
      const viewport = await this.getViewportConfig();
      if (viewport) {
        await this.setViewport(viewport);
        console.log(
          `[NavigateExecutor] Set viewport to: ${viewport.width}x${viewport.height}`
        );

        // Wait for viewport change to take effect
        await this.delay(500);
      }

      // Check if we need to refresh after setting mobile viewport
      const currentUrl = window.location.href;
      const isSameUrl =
        this.normalizeUrl(currentUrl) === this.normalizeUrl(url);

      // Navigate to the URL
      if (!isSameUrl) {
        window.location.href = url;
        console.log(`[NavigateExecutor] Navigating to: ${url}`);
      } else if (viewport?.isMobile) {
        // If already on the same URL and mobile viewport was set, refresh
        console.log(`[NavigateExecutor] Refreshing for mobile viewport`);
        window.location.reload();
      }

      // Wait for navigation to start
      await this.delay(1000);

      // Capture screenshot after navigation
      await this.captureAfter(action);
    } catch (error) {
      throw new Error(`Failed to navigate to ${url}: ${error}`);
    }
  }

  private async getViewportConfig(): Promise<{
    width: number;
    height: number;
    isMobile?: boolean;
  } | null> {
    try {
      // Send message to background to get viewport configuration
      const response = await this.sendMessage({
        type: 'GET_VIEWPORT_CONFIG',
      });

      if (response && response.viewport) {
        return response.viewport;
      }

      // Default to desktop viewport
      return this.DEFAULT_DESKTOP_VIEWPORT;
    } catch (error) {
      console.error('[NavigateExecutor] Failed to get viewport config:', error);
      return null;
    }
  }

  private async setViewport(viewport: {
    width: number;
    height: number;
  }): Promise<void> {
    // Send message to background script to resize window
    await this.sendMessage({
      type: 'SET_VIEWPORT',
      viewport,
    });
  }

  private normalizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      // Remove trailing slash and normalize
      return `${parsed.protocol}//${parsed.host}${parsed.pathname}`.replace(
        /\/$/,
        ''
      );
    } catch {
      return url;
    }
  }

  private sendMessage(message: any): Promise<any> {
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
