export interface ExecutionStep {
  action: string;
  timestamp: number;
  selector?: string;
  value?: string;
  screenshot?: string;
  error?: string;
}

export interface ExecutionMeta {
  id: string;
  startedAt: number;
  endedAt: number;
  stepCount: number;
  hasErrors: boolean;
  url?: string;
  title?: string;
}

export interface ExecutionLog {
  id: string;
  meta: ExecutionMeta;
  steps: ExecutionStep[];
}

export interface ExecutionStorageData {
  [key: string]: ExecutionLog;
}

export class ExecutionNotFoundError extends Error {
  constructor(id: string) {
    super(`Execution with id ${id} not found`);
    this.name = 'ExecutionNotFoundError';
  }
}

export class StorageQuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StorageQuotaError';
  }
}
