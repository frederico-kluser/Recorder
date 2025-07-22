/**
 * Interface ReplaySession para gerenciamento de sessões de replay
 */

import { Action } from '../../pages/types/index';

export enum ReplayStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export interface ReplaySession {
  id: string;
  recordingId?: string;
  actions: Action[];
  startedAt: number;
  status: ReplayStatus;
  currentActionIndex: number;
  tabId?: number;
  error?: string;
  completedAt?: number;
  pausedAt?: number;
  executionLogs: ExecutionLog[];
}

export interface ReplayProgress {
  sessionId: string;
  currentActionIndex: number;
  totalActions: number;
  status: ReplayStatus;
  error?: string;
}

export interface ReplayResult {
  sessionId: string;
  status: ReplayStatus;
  completedActions: number;
  totalActions: number;
  duration: number;
  error?: string;
}

// Cache modes conforme definido em replay.md
export enum CacheMode {
  CLEAN_CACHE = 'CLEAN_CACHE',
  KEEP_CACHE = 'KEEP_CACHE',
}

export interface ReplayOptions {
  cacheMode: CacheMode;
  autoScroll?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  chunkSize?: number;
}

export interface ExecutionLog {
  ts: number; // timestamp
  action: Action;
  screenshot: string; // base64 encoded image or error message
}
