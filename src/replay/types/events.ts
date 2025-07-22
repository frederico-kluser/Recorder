/**
 * Eventos e mensagens para comunicação do sistema de replay
 */

import {
  ReplayOptions,
  ReplayProgress,
  ReplayResult,
  ReplayStatus,
} from './session';

// Tipos de mensagens conforme replay.md
export enum ReplayMessageType {
  // Comandos
  REPLAY_START = 'REPLAY_START',
  REPLAY_PAUSE = 'REPLAY_PAUSE',
  REPLAY_STOP = 'REPLAY_STOP',
  REPLAY_RESUME = 'REPLAY_RESUME',

  // Status e progresso
  REPLAY_PROGRESS = 'REPLAY_PROGRESS',
  REPLAY_COMPLETED = 'REPLAY_COMPLETED',
  REPLAY_ERROR = 'REPLAY_ERROR',

  // Comandos internos
  REPLAY_CMD = 'REPLAY_CMD',
}

// Mensagens de comando
export interface ReplayStartMessage {
  type: ReplayMessageType.REPLAY_START;
  recordingId: string;
  options: ReplayOptions;
}

export interface ReplayPauseMessage {
  type: ReplayMessageType.REPLAY_PAUSE;
  sessionId: string;
}

export interface ReplayStopMessage {
  type: ReplayMessageType.REPLAY_STOP;
  sessionId: string;
}

export interface ReplayResumeMessage {
  type: ReplayMessageType.REPLAY_RESUME;
  sessionId: string;
}

// Mensagens de status
export interface ReplayProgressMessage {
  type: ReplayMessageType.REPLAY_PROGRESS;
  progress: ReplayProgress;
}

export interface ReplayCompletedMessage {
  type: ReplayMessageType.REPLAY_COMPLETED;
  result: ReplayResult;
}

export interface ReplayErrorMessage {
  type: ReplayMessageType.REPLAY_ERROR;
  sessionId: string;
  error: string;
}

// Mensagem genérica para comandos
export interface ReplayCmdMessage {
  type: ReplayMessageType.REPLAY_CMD;
  cmd: 'start' | 'pause' | 'stop' | 'resume';
  recordingId?: string;
  sessionId?: string;
  options?: ReplayOptions;
}

// Union type para todas as mensagens
export type ReplayMessage =
  | ReplayStartMessage
  | ReplayPauseMessage
  | ReplayStopMessage
  | ReplayResumeMessage
  | ReplayProgressMessage
  | ReplayCompletedMessage
  | ReplayErrorMessage
  | ReplayCmdMessage;

// Eventos internos do EventBus
export enum ReplayEventType {
  SESSION_CREATED = 'SESSION_CREATED',
  SESSION_STARTED = 'SESSION_STARTED',
  SESSION_PAUSED = 'SESSION_PAUSED',
  SESSION_RESUMED = 'SESSION_RESUMED',
  SESSION_COMPLETED = 'SESSION_COMPLETED',
  SESSION_ERROR = 'SESSION_ERROR',
  ACTION_EXECUTED = 'ACTION_EXECUTED',
  ACTION_ERROR = 'ACTION_ERROR',
}

export interface ReplayEvent {
  type: ReplayEventType;
  sessionId: string;
  data?: any;
  timestamp: number;
}
