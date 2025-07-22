/**
 * Singleton service for capturing screenshots during replay execution
 */

export class ScreenshotService {
  private static instance: ScreenshotService;
  private lastCaptureTime: number = 0;
  private readonly THROTTLE_DELAY = 100; // 100ms between captures
  private readonly MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit

  private constructor() {}

  /**
   * Get the singleton instance
   */
  static getInstance(): ScreenshotService {
    if (!ScreenshotService.instance) {
      ScreenshotService.instance = new ScreenshotService();
    }
    return ScreenshotService.instance;
  }

  /**
   * Capture a screenshot of the current visible tab
   * @param tabId - The tab ID to capture
   * @returns Base64 encoded image or error message
   */
  async capture(tabId: number): Promise<string> {
    try {
      // Validate tab exists
      const tab = await this.getTab(tabId);
      if (!tab) {
        return 'error:invalid_tab';
      }

      // Validate tab URL (cannot capture chrome:// pages)
      if (
        tab.url &&
        (tab.url.startsWith('chrome://') ||
          tab.url.startsWith('chrome-extension://'))
      ) {
        return 'error:restricted_url';
      }

      // Throttle captures
      const now = Date.now();
      const timeSinceLastCapture = now - this.lastCaptureTime;
      if (timeSinceLastCapture < this.THROTTLE_DELAY) {
        await this.delay(this.THROTTLE_DELAY - timeSinceLastCapture);
      }
      this.lastCaptureTime = Date.now();

      // Initial capture attempt with full quality
      let dataUrl = await this.captureWithQuality(tabId, 100);

      // Validate captured image
      if (!this.isValidDataUrl(dataUrl)) {
        console.error('Invalid screenshot data URL');
        return 'error:invalid_capture';
      }

      // Check size and reduce quality if needed
      let quality = 100;
      while (
        this.getDataUrlSize(dataUrl) > this.MAX_SIZE_BYTES &&
        quality > 10
      ) {
        quality -= 10;
        dataUrl = await this.captureWithQuality(tabId, quality);
      }

      return dataUrl;
    } catch (error) {
      // Handle common errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes('permission')) {
        return 'error:permission_denied';
      } else if (
        errorMessage.includes('not active') ||
        errorMessage.includes('not focused')
      ) {
        return 'error:tab_not_focused';
      } else if (errorMessage.includes('invalid tab')) {
        return 'error:invalid_tab';
      }

      console.error('Screenshot capture error:', errorMessage);
      return `error:${errorMessage}`;
    }
  }

  /**
   * Capture screenshot with specific quality
   */
  private async captureWithQuality(
    tabId: number,
    quality: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      // Get tab details first to get windowId
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !tab) {
          reject(
            new Error(chrome.runtime.lastError?.message || 'Tab not found')
          );
          return;
        }

        // Ensure tab is active before capturing
        chrome.tabs.update(tabId, { active: true }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }

          // Small delay to ensure tab is fully active
          setTimeout(() => {
            chrome.tabs.captureVisibleTab(
              tab.windowId, // use the tab's window ID
              {
                format: 'jpeg',
                quality: quality,
              },
              (dataUrl) => {
                if (chrome.runtime.lastError) {
                  reject(new Error(chrome.runtime.lastError.message));
                } else if (dataUrl) {
                  resolve(dataUrl);
                } else {
                  reject(new Error('Failed to capture screenshot'));
                }
              }
            );
          }, 50);
        });
      });
    });
  }

  /**
   * Get the size of a data URL in bytes
   */
  private getDataUrlSize(dataUrl: string): number {
    // Remove the data:image/jpeg;base64, prefix
    const base64 = dataUrl.split(',')[1];
    // Base64 encoding increases size by ~33%
    return Math.round(base64.length * 0.75);
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get tab information
   */
  private getTab(tabId: number): Promise<chrome.tabs.Tab | null> {
    return new Promise((resolve) => {
      chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError || !tab) {
          resolve(null);
        } else {
          resolve(tab);
        }
      });
    });
  }

  /**
   * Validate data URL format
   */
  private isValidDataUrl(dataUrl: string): boolean {
    return (
      dataUrl &&
      dataUrl.startsWith('data:image/') &&
      dataUrl.includes('base64,') &&
      dataUrl.split(',')[1]?.length > 0
    );
  }
}

// Export singleton instance
export const screenshotService = ScreenshotService.getInstance();
