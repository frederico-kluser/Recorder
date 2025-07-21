/**
 * Tipos TypeScript para o sistema de replay de gravações
 */

import type { Action } from '../pages/types/index';

/**
 * Modos de replay disponíveis
 */
export enum ReplayMode {
  /** Mantém o cache atual do navegador */
  KEEP_CACHE = 'keep-cache',
  /** Limpa todo o cache antes de iniciar */
  CLEAN_CACHE = 'clean-cache'
}

/**
 * Status possíveis durante o replay
 */
export type ReplayStatus = 'idle' | 'preparing' | 'running' | 'paused' | 'completed' | 'error';

/**
 * Estado do replay
 */
export interface ReplayState {
  status: ReplayStatus;
  currentStep: number;
  totalSteps: number;
  tabId: number;
  error?: string;
}

/**
 * Mensagem de requisição para iniciar replay
 */
export interface ReplayRequest {
  type: 'REPLAY_REQUEST';
  recordingId: string;
  tabId?: number;
  mode?: ReplayMode;
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
  mode?: ReplayMode;
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
 * Enumeração dos tipos de mensagem
 */
export enum ReplayMessageType {
  REPLAY_REQUEST = 'REPLAY_REQUEST',
  REPLAY_STATUS = 'REPLAY_STATUS',
  REPLAY_EXECUTE = 'REPLAY_EXECUTE',
  REPLAY_RESULT = 'REPLAY_RESULT',
  REPLAY_STOP = 'REPLAY_STOP',
  RUNNER_READY = 'RUNNER_READY',
  BG_STATUS = 'BG_STATUS'
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