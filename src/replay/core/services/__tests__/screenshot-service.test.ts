/**
 * Tests for ScreenshotService
 */

import { ScreenshotService } from '../screenshot-service';

// Mock chrome API
const mockCaptureVisibleTab = jest.fn();
const mockTabsUpdate = jest.fn();
const mockTabsGet = jest.fn();

global.chrome = {
  tabs: {
    captureVisibleTab: mockCaptureVisibleTab,
    update: mockTabsUpdate,
    get: mockTabsGet,
  },
  runtime: {
    lastError: null,
  },
} as any;

describe('ScreenshotService', () => {
  let service: ScreenshotService;

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset singleton instance
    (ScreenshotService as any).instance = null;
    service = ScreenshotService.getInstance();
  });

  describe('getInstance', () => {
    it('should return the same instance', () => {
      const instance1 = ScreenshotService.getInstance();
      const instance2 = ScreenshotService.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('capture', () => {
    const mockTabId = 123;
    const mockDataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...';
    const mockWindowId = 456;

    beforeEach(() => {
      mockTabsGet.mockImplementation((tabId, callback) => {
        setTimeout(() => callback({ id: tabId, windowId: mockWindowId }), 0);
      });
      mockTabsUpdate.mockImplementation((tabId, updateInfo, callback) => {
        setTimeout(() => callback(), 0);
      });
    });

    it('should capture screenshot successfully', async () => {
      mockCaptureVisibleTab.mockImplementation(
        (windowId, options, callback) => {
          setTimeout(() => callback(mockDataUrl), 50);
        }
      );

      const result = await service.capture(mockTabId);

      expect(mockTabsUpdate).toHaveBeenCalledWith(
        mockTabId,
        { active: true },
        expect.any(Function)
      );
      expect(mockCaptureVisibleTab).toHaveBeenCalledWith(
        mockWindowId,
        { format: 'jpeg', quality: 100 },
        expect.any(Function)
      );
      expect(result).toBe(mockDataUrl);
    });

    it('should handle permission denied error', async () => {
      mockTabsGet.mockImplementation((tabId, callback) => {
        global.chrome.runtime.lastError = { message: 'Permission denied' };
        setTimeout(() => callback(null), 0);
        global.chrome.runtime.lastError = undefined;
      });

      const result = await service.capture(mockTabId);

      expect(result).toBe('error:Tab not found');
    });

    it('should handle tab not focused error', async () => {
      mockTabsUpdate.mockImplementation((tabId, updateInfo, callback) => {
        setTimeout(() => callback(), 0);
      });
      mockCaptureVisibleTab.mockImplementation(
        (windowId, options, callback) => {
          global.chrome.runtime.lastError = { message: 'Tab not active' };
          setTimeout(() => callback(null), 50);
          global.chrome.runtime.lastError = undefined;
        }
      );

      const result = await service.capture(mockTabId);

      expect(result).toBe('error:Failed to capture screenshot');
    });

    it('should handle invalid tab error', async () => {
      mockTabsGet.mockImplementation((tabId, callback) => {
        global.chrome.runtime.lastError = { message: 'No tab with id: 123' };
        setTimeout(() => callback(null), 0);
        global.chrome.runtime.lastError = undefined;
      });

      const result = await service.capture(mockTabId);

      expect(result).toBe('error:Tab not found');
    });

    it('should reduce quality if screenshot is too large', async () => {
      // Create a large base64 string (> 5MB when decoded)
      const largeBase64 = 'A'.repeat(7 * 1024 * 1024); // ~7MB
      const largeDataUrl = `data:image/jpeg;base64,${largeBase64}`;
      const smallDataUrl = 'data:image/jpeg;base64,/9j/small...';

      let callCount = 0;
      mockCaptureVisibleTab.mockImplementation(
        (windowId, options, callback) => {
          callCount++;
          if (callCount === 1) {
            // First call returns large image
            setTimeout(() => callback(largeDataUrl), 50);
          } else {
            // Subsequent calls return smaller image
            setTimeout(() => callback(smallDataUrl), 50);
          }
        }
      );

      const result = await service.capture(mockTabId);

      // Should have been called multiple times with decreasing quality
      expect(mockCaptureVisibleTab).toHaveBeenCalledTimes(2);
      expect(mockCaptureVisibleTab).toHaveBeenNthCalledWith(
        1,
        mockWindowId,
        { format: 'jpeg', quality: 100 },
        expect.any(Function)
      );
      expect(mockCaptureVisibleTab).toHaveBeenNthCalledWith(
        2,
        mockWindowId,
        { format: 'jpeg', quality: 90 },
        expect.any(Function)
      );
      expect(result).toBe(smallDataUrl);
    });

    it('should throttle rapid capture requests', async () => {
      mockCaptureVisibleTab.mockImplementation(
        (windowId, options, callback) => {
          setTimeout(() => callback(mockDataUrl), 50);
        }
      );

      const start = Date.now();

      // First capture
      await service.capture(mockTabId);

      // Second capture immediately after
      await service.capture(mockTabId);

      const elapsed = Date.now() - start;

      // Should have throttled the second capture
      expect(elapsed).toBeGreaterThanOrEqual(100);
    });

    it('should handle generic errors', async () => {
      mockTabsGet.mockImplementation((tabId, callback) => {
        throw new Error('Unexpected error');
      });

      const result = await service.capture(mockTabId);

      expect(result).toBe('error:Unexpected error');
    });
  });
});
