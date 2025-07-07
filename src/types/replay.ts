/**
 * Tipos TypeScript para o sistema de replay de gravações
 */

import type { Action } from '../pages/types/index';

/**
 * Status possíveis durante o replay
 */
export type ReplayStatus = 'idle' | 'preparing' | 'running' | 'paused' | 'completed' | 'error';

/**
 * Estado do replay
 */
export interface ReplayState {
  status: ReplayStatus;
  currentStepIndex: number;
  totalSteps: number;
  startTime: number | null;
  error?: string;
}

/**
 * Mensagem de requisição para iniciar replay
 */
export interface ReplayRequest {
  type: 'REPLAY_REQUEST';
  recordingId: string;
  tabId?: number;
}

/**
 * Mensagem de atualização de status do replay
 */
export interface ReplayStatusUpdate {
  type: 'REPLAY_STATUS';
  state: ReplayState;
  tabId: number;
}

/**
 * Mensagem para executar ações no runner
 */
export interface ReplayExecute {
  type: 'REPLAY_EXECUTE';
  actions: Action[];
  initialUrl: string;
}

/**
 * Mensagem de resultado da execução
 */
export interface ReplayResult {
  type: 'REPLAY_RESULT';
  success: boolean;
  error?: string;
  completedSteps: number;
}

/**
 * União de todos os tipos de mensagem de replay
 */
export type ReplayMessage = 
  | ReplayRequest 
  | ReplayStatusUpdate 
  | ReplayExecute 
  | ReplayResult;

/**
 * Opções para o executor de ações
 */
export interface ActionExecutorOptions {
  waitTimeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

/**
 * Resultado da execução de uma ação
 */
export interface ActionExecutionResult {
  success: boolean;
  error?: string;
  duration?: number;
}