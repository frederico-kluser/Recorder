export interface BatchResult {
  id: string;
  title: string;
  status: 'PENDING' | 'RUNNING' | 'PASSED' | 'FAILED';
  error?: string;
  lastScreenshot?: string;
  startedAt?: number;
  endedAt?: number;
  duration?: number;
  stepsCompleted: number;
  totalSteps: number;
}

export interface BatchSummary {
  total: number;
  passed: string[];
  failed: Array<{
    id: string;
    title: string;
    error: string;
    screenshot?: string;
  }>;
  running: number;
  pending: number;
  startedAt: number;
  endedAt?: number;
  duration?: number;
}

export interface BatchConfig {
  concurrency: number;
  retryFailed: boolean;
  screenshotOnError: boolean;
  maxScreenshotSize: number;
  timeout: number;
}

export interface BatchEvents {
  onBeforeTest?: (recordingId: string) => void | Promise<void>;
  onAfterTest?: (
    recordingId: string,
    result: BatchResult
  ) => void | Promise<void>;
  onBatchStart?: () => void | Promise<void>;
  onBatchComplete?: (summary: BatchSummary) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
}

export interface BatchRunnerState {
  isRunning: boolean;
  isPaused: boolean;
  currentRecordingId?: string;
  jobs: Map<string, BatchResult>;
  config: BatchConfig;
}
