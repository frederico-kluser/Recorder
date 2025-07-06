/**
 * Interface de configuração para funcionalidade de timing
 */
export interface TimingConfig {
  /** Habilita inserção de waits baseados em timestamps */
  enableWaits: boolean;
  /** Tempo máximo de wait em milissegundos (padrão: 30000) */
  maxWaitMs: number;
  /** Tempo mínimo de wait em milissegundos (padrão: 20) */
  minWaitMs: number;
}

/**
 * Configuração padrão para timing
 */
export const DEFAULT_TIMING_CONFIG: TimingConfig = {
  enableWaits: true,
  maxWaitMs: 30000,
  minWaitMs: 20
};