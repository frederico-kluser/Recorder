/**
 * Configuração padrão do sistema de replay
 */

import { ReplayOptions, CacheMode } from '../types/session';

export interface ReplayConfig {
  maxRetries: number;
  retryDelay: number;
  chunkSize: number;
  autoScroll: boolean;
  defaultCacheMode: CacheMode;
  tabLoadTimeout: number;
  actionTimeout: number;
  progressSaveInterval: number;
}

export const DEFAULT_REPLAY_CONFIG: ReplayConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 segundo entre ações
  chunkSize: 10, // Salvar progresso a cada 10 ações
  autoScroll: true,
  defaultCacheMode: CacheMode.KEEP_CACHE,
  tabLoadTimeout: 30000, // 30 segundos para carregar aba
  actionTimeout: 30000, // 30 segundos para executar ação
  progressSaveInterval: 20, // Salvar a cada 20 ações
};
