/**
 * Módulo de replay - exportações principais
 * Centraliza as funcionalidades de replay de gravações
 */

export { replayHandler } from './replay-handler.js';
export * from '../../types/replay.js';

// Nota: replay-runner é injetado diretamente como script e não precisa ser exportado aqui