/**
 * Integration tests for screenshot capture during replay
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';
import path from 'path';

// Helper to load the extension
async function loadExtension(context: BrowserContext) {
  const extensionPath = path.join(__dirname, '../../dist');

  // Get extension ID from manifest
  const pages = context.pages();
  const extensionId = await pages[0].evaluate(() => {
    return chrome.runtime.id;
  });

  return extensionId;
}

// Helper to open extension popup
async function openExtensionPopup(page: Page, extensionId: string) {
  await page.goto(`chrome-extension://${extensionId}/popup.html`);
  await page.waitForLoadState('networkidle');
}

test.describe('Screenshot Capture During Replay', () => {
  let context: BrowserContext;
  let page: Page;
  let extensionId: string;

  test.beforeAll(async ({ browser }) => {
    // Create context with extension loaded
    context = await browser.newContext({
      // Note: Loading extensions in Playwright requires specific browser launch args
      // This test would need to be run with proper extension loading setup
    });
  });

  test.beforeEach(async () => {
    page = await context.newPage();
    extensionId = await loadExtension(context);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('should capture screenshots for each action during replay', async () => {
    // Create a test recording
    const testRecording = {
      id: 'test-screenshot-capture',
      title: 'Test Screenshot Capture',
      urlOriginal: 'https://example.com',
      hostname: 'example.com',
      startedAt: Date.now() - 10000,
      endedAt: Date.now(),
      actions: [
        {
          type: 'navigate',
          url: 'https://example.com',
          timestamp: Date.now() - 9000,
          selectors: {},
          tagName: 'A',
          isPassword: false,
          hasOnlyText: false,
        },
        {
          type: 'click',
          selector: 'a[href="/about"]',
          timestamp: Date.now() - 8000,
          selectors: {
            generalSelector: 'a[href="/about"]',
            id: null,
            testIdSelector: null,
            attrSelector: null,
          },
          tagName: 'A',
          isPassword: false,
          hasOnlyText: true,
        },
        {
          type: 'input',
          value: 'test@example.com',
          timestamp: Date.now() - 7000,
          selectors: {
            generalSelector: 'input[type="email"]',
            id: 'email',
            testIdSelector: null,
            attrSelector: null,
          },
          tagName: 'INPUT',
          inputType: 'email',
          isPassword: false,
          hasOnlyText: false,
        },
      ],
      code: {
        cypress: '',
      },
    };

    // Save test recording
    await page.evaluate((recording: any) => {
      return new Promise<void>((resolve) => {
        chrome.storage.local.set(
          {
            recordingHistory: {
              [recording.id]: recording,
            },
          },
          () => resolve()
        );
      });
    }, testRecording);

    // Open extension popup
    await openExtensionPopup(page, extensionId);

    // Navigate to recording detail
    await page.click(`[data-recording-id="${testRecording.id}"]`);
    await page.waitForSelector('.recording-detail');

    // Start replay
    await page.click('button:has-text("Replay")');

    // Wait for replay to complete
    await page.waitForSelector('text=Replay concluído', { timeout: 30000 });

    // Click on execution history tab
    await page.click('button:has-text("Execução")');
    await page.waitForSelector('.execution-history-container');

    // Verify execution logs are displayed
    const executionLogs = await page.locator('.execution-log-item').count();
    expect(executionLogs).toBe(3); // 3 actions

    // Verify screenshots are captured
    const screenshots = await page.locator('.log-thumbnail img').count();
    expect(screenshots).toBeGreaterThan(0);

    // Click on first screenshot to open lightbox
    await page.click('.execution-log-item:first-child');
    await page.waitForSelector('.screenshot-lightbox');

    // Verify lightbox displays screenshot
    const lightboxImg = await page.locator('.screenshot-lightbox img');
    expect(await lightboxImg.isVisible()).toBe(true);
  });

  test('should handle screenshot capture errors gracefully', async () => {
    const testRecording = {
      id: 'test-screenshot-error',
      title: 'Test Screenshot Error',
      urlOriginal: 'https://example.com',
      hostname: 'example.com',
      startedAt: Date.now() - 10000,
      endedAt: Date.now(),
      actions: [
        {
          type: 'navigate',
          url: 'chrome://settings', // This will fail screenshot capture
          timestamp: Date.now() - 9000,
          selectors: {},
          tagName: 'A',
          isPassword: false,
          hasOnlyText: false,
        },
      ],
      code: {
        cypress: '',
      },
    };

    // Save test recording
    await page.evaluate((recording: any) => {
      return new Promise<void>((resolve) => {
        chrome.storage.local.set(
          {
            recordingHistory: {
              [recording.id]: recording,
            },
          },
          () => resolve()
        );
      });
    }, testRecording);

    // Open extension popup
    await openExtensionPopup(page, extensionId);

    // Navigate to recording detail
    await page.click(`[data-recording-id="${testRecording.id}"]`);
    await page.waitForSelector('.recording-detail');

    // Start replay
    await page.click('button:has-text("Replay")');

    // Wait for replay to complete or error
    await page.waitForSelector('text=Replay concluído, text=Erro no replay', {
      timeout: 30000,
    });

    // Click on execution history tab
    await page.click('button:has-text("Execução")');
    await page.waitForSelector('.execution-history-container');

    // Verify error message is displayed for failed screenshot
    const errorMessage = await page.locator('.screenshot-error').first();
    expect(await errorMessage.isVisible()).toBe(true);
    expect(await errorMessage.textContent()).toContain('Permission denied');
  });

  test('should update execution logs in real-time during replay', async () => {
    const testRecording = {
      id: 'test-realtime-update',
      title: 'Test Realtime Update',
      urlOriginal: 'https://example.com',
      hostname: 'example.com',
      startedAt: Date.now() - 10000,
      endedAt: Date.now(),
      actions: [
        {
          type: 'navigate',
          url: 'https://example.com',
          timestamp: Date.now() - 9000,
          selectors: {},
          tagName: 'A',
          isPassword: false,
          hasOnlyText: false,
        },
        {
          type: 'resize',
          width: 1200,
          height: 800,
          timestamp: Date.now() - 8000,
          selectors: {},
          tagName: 'BODY',
          isPassword: false,
          hasOnlyText: false,
        },
      ],
      code: {
        cypress: '',
      },
    };

    // Save test recording
    await page.evaluate((recording: any) => {
      return new Promise<void>((resolve) => {
        chrome.storage.local.set(
          {
            recordingHistory: {
              [recording.id]: recording,
            },
          },
          () => resolve()
        );
      });
    }, testRecording);

    // Open extension popup
    await openExtensionPopup(page, extensionId);

    // Navigate to recording detail
    await page.click(`[data-recording-id="${testRecording.id}"]`);
    await page.waitForSelector('.recording-detail');

    // Click on execution history tab BEFORE starting replay
    await page.click('button:has-text("Execução")');
    await page.waitForSelector('.execution-history-container');

    // Verify no logs initially
    const initialLogs = await page.locator('.execution-log-item').count();
    expect(initialLogs).toBe(0);

    // Start replay
    await page.click('button:has-text("Replay")');

    // Wait for first log to appear
    await page.waitForSelector('.execution-log-item', { timeout: 10000 });

    // Verify logs are being added in real-time
    const logsAfterFirstAction = await page
      .locator('.execution-log-item')
      .count();
    expect(logsAfterFirstAction).toBeGreaterThan(0);

    // Wait for replay to complete
    await page.waitForSelector('text=Replay concluído', { timeout: 30000 });

    // Verify all logs are displayed
    const finalLogs = await page.locator('.execution-log-item').count();
    expect(finalLogs).toBe(2); // 2 actions
  });
});
