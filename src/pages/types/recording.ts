/**
 * Tipos para o sistema de histórico de gravações
 */

import { Action } from './index';
import { ExecutionLog } from '../../replay/types/session';

/**
 * Representa uma entrada no histórico de gravações
 */
export interface RecordingEntry {
  /** ID único da gravação no formato: {hostname}:{yyyy-MM-dd_HH-mm} */
  id: string;

  /** Título formatado da gravação (hostname + data/hora) */
  title: string;

  /** URL original onde a gravação começou (campo principal) */
  urlOriginal: string;

  /** URL da página onde a gravação foi feita (campo legado, será migrado para urlOriginal) */
  url?: string;

  /** Primeira URL capturada durante a gravação (campo legado, será migrado para urlOriginal) */
  firstUrl?: string;

  /** Hostname extraído da URL */
  hostname: string;

  /** Timestamp do início da gravação */
  startedAt: number;

  /** Timestamp do fim da gravação */
  endedAt: number;

  /** Lista de ações gravadas */
  actions: Action[];

  /** Código gerado para Cypress */
  code: {
    cypress: string;
    cypressTemplate?: string; // Nova versão com template
  };

  /** Logs de execução da última sessão de replay */
  executionLogs?: ExecutionLog[];
}

/**
 * Configuração do histórico
 */
export interface HistoryConfig {
  /** Número máximo de gravações a manter */
  maxEntries: number;

  /** Estratégia quando o limite é atingido */
  pruneStrategy: 'drop-oldest' | 'error';
}

/**
 * Interface para backend de histórico
 */
export interface IHistoryBackend {
  save(entry: RecordingEntry): Promise<void>;
  list(): Promise<RecordingEntry[]>;
  get(id: string): Promise<RecordingEntry | null>;
  remove(id: string): Promise<void>;
  clear(): Promise<void>;
}
