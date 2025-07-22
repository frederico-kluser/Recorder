import { BatchConfig } from '../types/batch';

export const DEFAULT_BATCH_CONFIG: BatchConfig = {
  concurrency: 1,
  retryFailed: false,
  screenshotOnError: true,
  maxScreenshotSize: 5_000_000,
  timeout: 300000,
};

export function getDefaultBatchConfig(): BatchConfig {
  return { ...DEFAULT_BATCH_CONFIG };
}

export async function loadBatchConfig(): Promise<BatchConfig> {
  try {
    const result = await chrome.storage.sync.get('batchConfig');
    if (result.batchConfig) {
      return {
        ...DEFAULT_BATCH_CONFIG,
        ...result.batchConfig,
      };
    }
  } catch (error) {
    console.error('Failed to load batch config:', error);
  }
  return getDefaultBatchConfig();
}

export async function saveBatchConfig(
  config: Partial<BatchConfig>
): Promise<void> {
  const current = await loadBatchConfig();
  const updated = { ...current, ...config };
  await chrome.storage.sync.set({ batchConfig: updated });
}

export function validateBatchConfig(config: Partial<BatchConfig>): string[] {
  const errors: string[] = [];

  if (config.concurrency !== undefined) {
    if (config.concurrency < 1 || config.concurrency > 5) {
      errors.push('Concurrency must be between 1 and 5');
    }
  }

  if (config.maxScreenshotSize !== undefined) {
    if (
      config.maxScreenshotSize < 100_000 ||
      config.maxScreenshotSize > 10_000_000
    ) {
      errors.push('Max screenshot size must be between 100KB and 10MB');
    }
  }

  if (config.timeout !== undefined) {
    if (config.timeout < 10000 || config.timeout > 600000) {
      errors.push('Timeout must be between 10s and 10 minutes');
    }
  }

  return errors;
}
