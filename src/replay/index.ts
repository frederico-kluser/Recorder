/**
 * Exportações públicas do sistema de replay
 */

// API pública
export { startReplay, pauseReplay, resumeReplay, stopReplay } from './api';
export { useReplay } from './api/hooks';

// Configuração
export { getReplayConfig, setReplayConfig, resetReplayConfig } from './config';
export type { ReplayConfig } from './config/default';

// Tipos
export {
  ReplayStatus,
  ReplaySession,
  ReplayProgress,
  ReplayResult,
  CacheMode,
  ReplayOptions,
} from './types/session';

export {
  ReplayMessage,
  ReplayMessageType,
  ReplayEvent,
  ReplayEventType,
} from './types/events';

// Engine - para uso interno
export { ReplayEngine } from './core/engine';
