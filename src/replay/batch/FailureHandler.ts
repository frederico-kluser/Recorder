import { BatchConfig, BatchResult } from '../../types/batch';

export interface RetryStrategy {
  shouldRetry(error: Error, attempt: number): boolean;
  getDelay(attempt: number): number;
}

export class ExponentialBackoffStrategy implements RetryStrategy {
  constructor(
    private maxAttempts: number = 3,
    private baseDelay: number = 1000,
    private maxDelay: number = 30000
  ) {}

  shouldRetry(error: Error, attempt: number): boolean {
    if (attempt >= this.maxAttempts) return false;

    const nonRetryableErrors = [
      'Invalid recording',
      'Recording not found',
      'No actions to replay',
      'Permission denied',
    ];

    return !nonRetryableErrors.some((msg) => error.message.includes(msg));
  }

  getDelay(attempt: number): number {
    const delay = Math.min(
      this.baseDelay * Math.pow(2, attempt - 1),
      this.maxDelay
    );
    const jitter = Math.random() * 0.3 * delay;
    return Math.floor(delay + jitter);
  }
}

export class FailureHandler {
  private strategy: RetryStrategy;

  constructor(private config: BatchConfig, strategy?: RetryStrategy) {
    this.strategy = strategy || new ExponentialBackoffStrategy();
  }

  async handleFailure(
    result: BatchResult,
    error: Error,
    attempt: number = 1
  ): Promise<{ retry: boolean; delay?: number }> {
    result.error = error.message;
    result.status = 'FAILED';

    if (!this.config.retryFailed) {
      return { retry: false };
    }

    const shouldRetry = this.strategy.shouldRetry(error, attempt);

    if (shouldRetry) {
      const delay = this.strategy.getDelay(attempt);
      console.log(
        `Retrying test "${result.id}" after ${delay}ms (attempt ${attempt})`
      );
      return { retry: true, delay };
    }

    console.error(
      `Test "${result.id}" failed permanently after ${attempt} attempts:`,
      error.message
    );
    return { retry: false };
  }

  categorizeError(
    error: Error
  ): 'network' | 'permission' | 'timeout' | 'script' | 'unknown' {
    const message = error.message.toLowerCase();

    if (message.includes('network') || message.includes('fetch')) {
      return 'network';
    }
    if (message.includes('permission') || message.includes('denied')) {
      return 'permission';
    }
    if (message.includes('timeout') || message.includes('timed out')) {
      return 'timeout';
    }
    if (message.includes('script') || message.includes('syntax')) {
      return 'script';
    }

    return 'unknown';
  }

  getErrorSeverity(error: Error): 'critical' | 'high' | 'medium' | 'low' {
    const category = this.categorizeError(error);

    switch (category) {
      case 'permission':
        return 'critical';
      case 'script':
        return 'high';
      case 'timeout':
      case 'network':
        return 'medium';
      default:
        return 'low';
    }
  }
}
