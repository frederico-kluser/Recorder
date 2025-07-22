/**
 * Store para gerenciar o histórico de gravações usando chrome.storage.local
 * Implementa padrão Singleton para garantir uma única instância
 */

import {
  RecordingEntry,
  HistoryConfig,
  IHistoryBackend,
} from '../types/recording';
import { Action } from '../types';
import { ExecutionLog } from '../../replay/types/session';
import { debounce } from 'lodash';

const STORAGE_KEY = 'recordingHistory';
const CONFIG_KEY = 'historyConfig';
const MAX_ENTRIES_DEFAULT = 100;

/**
 * Configuração padrão do histórico
 */
const DEFAULT_CONFIG: HistoryConfig = {
  maxEntries: MAX_ENTRIES_DEFAULT,
  pruneStrategy: 'drop-oldest',
};

/**
 * Store singleton para gerenciar gravações
 */
export class RecordingStore implements IHistoryBackend {
  private static instance: RecordingStore;
  private config: HistoryConfig = DEFAULT_CONFIG;
  private saveDebounceTimer: NodeJS.Timeout | null = null;
  private pendingSaves: Map<string, RecordingEntry> = new Map();

  private constructor() {}

  /**
   * Obtém a instância única do RecordingStore
   */
  static getInstance(): RecordingStore {
    if (!RecordingStore.instance) {
      RecordingStore.instance = new RecordingStore();
    }
    return RecordingStore.instance;
  }

  /**
   * Inicializa o store carregando a configuração
   */
  async initialize(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(CONFIG_KEY);
      if (result[CONFIG_KEY]) {
        this.config = { ...DEFAULT_CONFIG, ...result[CONFIG_KEY] };
      }

      // Executa migração de URLs se necessário
      await this.migrateToUrlOriginal();

      // Executa migração para adicionar executionLogs vazios
      await this.migrateExecutionLogs();
    } catch (error) {
      console.warn('Erro ao carregar configuração do histórico:', error);
    }
  }

  /**
   * Salva uma gravação no histórico
   */
  async save(entry: RecordingEntry): Promise<void> {
    // Adiciona à fila de salvamento pendente
    this.pendingSaves.set(entry.id, entry);

    // Debounce para evitar muitas escritas
    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer);
    }

    this.saveDebounceTimer = setTimeout(() => {
      this.flushPendingSaves();
    }, 200);
  }

  /**
   * Processa todos os salvamentos pendentes
   */
  private async flushPendingSaves(): Promise<void> {
    if (this.pendingSaves.size === 0) return;

    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      let recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      // Adiciona as novas gravações
      for (const [id, entry] of this.pendingSaves) {
        recordings[id] = entry;
      }

      // Aplica limite de entradas se necessário
      const entries = Object.entries(recordings);
      if (entries.length > this.config.maxEntries) {
        recordings = await this.pruneOldEntries(recordings);
      }

      // Salva no storage
      await chrome.storage.local.set({ [STORAGE_KEY]: recordings });

      // Limpa pendências
      this.pendingSaves.clear();
    } catch (error) {
      console.error('Erro ao salvar gravações:', error);
      throw new Error(
        `Falha ao salvar gravações: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Remove gravações antigas quando o limite é atingido
   */
  private async pruneOldEntries(
    recordings: Record<string, RecordingEntry>
  ): Promise<Record<string, RecordingEntry>> {
    if (this.config.pruneStrategy === 'error') {
      throw new Error(`Limite de ${this.config.maxEntries} gravações atingido`);
    }

    // Estratégia 'drop-oldest': remove as mais antigas
    const entries = Object.entries(recordings);
    const sorted = entries.sort((a, b) => b[1].startedAt - a[1].startedAt);
    const kept = sorted.slice(0, this.config.maxEntries);

    return Object.fromEntries(kept);
  }

  /**
   * Lista todas as gravações ordenadas por data (mais recente primeiro)
   */
  async list(): Promise<RecordingEntry[]> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      return Object.values(recordings).sort(
        (a, b) => b.startedAt - a.startedAt
      );
    } catch (error) {
      console.error('Erro ao listar gravações:', error);
      return [];
    }
  }

  /**
   * Obtém uma gravação específica pelo ID
   */
  async get(id: string): Promise<RecordingEntry | null> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      return recordings[id] || null;
    } catch (error) {
      console.error('Erro ao obter gravação:', error);
      return null;
    }
  }

  /**
   * Remove uma gravação específica
   */
  async remove(id: string): Promise<void> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      delete recordings[id];

      await chrome.storage.local.set({ [STORAGE_KEY]: recordings });
    } catch (error) {
      console.error('Erro ao remover gravação:', error);
      throw new Error(
        `Falha ao remover gravação: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Limpa todo o histórico
   */
  async clear(): Promise<void> {
    try {
      await chrome.storage.local.remove(STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
      throw new Error(
        `Falha ao limpar histórico: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Migra gravações antigas para o novo formato com urlOriginal
   */
  async migrateToUrlOriginal(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      let hasChanges = false;

      for (const [id, entry] of Object.entries(recordings)) {
        // Se não tem urlOriginal, migra
        if (!entry.urlOriginal) {
          // Prioridade: firstUrl > url
          entry.urlOriginal = entry.firstUrl || entry.url || 'unknown';
          hasChanges = true;
          console.log(
            `Migrada gravação ${id}: urlOriginal = ${entry.urlOriginal}`
          );
        }
      }

      if (hasChanges) {
        await chrome.storage.local.set({ [STORAGE_KEY]: recordings });
        console.log('Migração de URLs concluída');
      }
    } catch (error) {
      console.error('Erro ao migrar URLs:', error);
    }
  }

  /**
   * Migra a última gravação do formato antigo para o novo
   */
  async migrateLastRecording(): Promise<void> {
    try {
      const result = await chrome.storage.local.get('lastRecording');
      if (!result.lastRecording) return;

      const oldActions: Action[] = result.lastRecording;
      if (!Array.isArray(oldActions) || oldActions.length === 0) return;

      // Cria uma entrada de gravação a partir dos dados antigos
      const firstAction = oldActions[0];
      const lastAction = oldActions[oldActions.length - 1];

      // Tenta extrair URL da primeira ação Navigate
      let url = 'unknown';
      let hostname = 'localfile';

      const navigateAction = oldActions.find((a) => a.type === 'navigate');
      if (navigateAction && 'url' in navigateAction) {
        url = (navigateAction as any).url as string;
        try {
          const urlObj = new URL(url);
          hostname = urlObj.hostname || 'localfile';
        } catch (e) {
          // URL inválida, mantém defaults
        }
      }

      const timestamp = firstAction.timestamp || Date.now();
      const date = new Date(timestamp);
      const dateStr = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const timeStr = `${String(date.getHours()).padStart(2, '0')}-${String(
        date.getMinutes()
      ).padStart(2, '0')}`;

      const entry: RecordingEntry = {
        id: `${hostname}:${dateStr}_${timeStr}`,
        title: `${hostname} - ${dateStr} ${timeStr.replace('-', ':')}`,
        urlOriginal: url, // Campo principal
        url: url, // Mantém para compatibilidade
        hostname,
        startedAt: timestamp,
        endedAt: lastAction.timestamp || timestamp,
        actions: oldActions,
        code: {
          cypress: '',
        },
      };

      // Salva no novo formato
      await this.save(entry);

      // Remove do formato antigo
      await chrome.storage.local.remove('lastRecording');

      console.log('Migração da última gravação concluída');
    } catch (error) {
      console.error('Erro ao migrar última gravação:', error);
    }
  }

  /**
   * Atualiza os logs de execução de uma gravação
   */
  async updateExecutionLogs(
    recordingId: string,
    executionLogs: ExecutionLog[]
  ): Promise<void> {
    // Update execution logs directly
    await this.doUpdateExecutionLogs(recordingId, executionLogs);
  }

  /**
   * Internal method to actually update execution logs
   */
  private async doUpdateExecutionLogs(
    recordingId: string,
    executionLogs: ExecutionLog[]
  ): Promise<void> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      if (recordings[recordingId]) {
        // Merge new logs with existing ones
        recordings[recordingId].executionLogs = executionLogs;

        // Check storage quota and prune if needed
        const storageInfo = await chrome.storage.local.getBytesInUse(
          STORAGE_KEY
        );
        const STORAGE_QUOTA_LIMIT = 5 * 1024 * 1024; // 5MB limit

        if (storageInfo > STORAGE_QUOTA_LIMIT) {
          // Prune screenshots from old execution logs
          console.warn(
            '[RecordingStore] Storage quota exceeded, pruning old screenshots'
          );
          await this.pruneOldScreenshots(recordings);
        }

        await chrome.storage.local.set({ [STORAGE_KEY]: recordings });
      }
    } catch (error) {
      console.error('[RecordingStore] Error updating execution logs:', error);
    }
  }

  /**
   * Prune old screenshots to save storage space
   */
  private async pruneOldScreenshots(
    recordings: Record<string, RecordingEntry>
  ): Promise<void> {
    const entries = Object.entries(recordings).sort(
      (a, b) => b[1].startedAt - a[1].startedAt
    );

    // Keep screenshots only for the 10 most recent recordings
    entries.forEach(([id, entry], index) => {
      if (index >= 10 && entry.executionLogs) {
        // Replace screenshots with placeholder
        entry.executionLogs.forEach((log) => {
          if (log.screenshot && !log.screenshot.startsWith('error:')) {
            log.screenshot = 'error:pruned_for_storage';
          }
        });
      }
    });
  }

  /**
   * Migra gravações antigas para adicionar executionLogs vazios
   */
  async migrateExecutionLogs(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      const recordings: Record<string, RecordingEntry> =
        result[STORAGE_KEY] || {};

      let hasChanges = false;

      for (const [id, entry] of Object.entries(recordings)) {
        // Se não tem executionLogs, adiciona array vazio
        if (!entry.executionLogs) {
          entry.executionLogs = [];
          hasChanges = true;
          console.log(`Migrada gravação ${id}: adicionado executionLogs vazio`);
        }
      }

      if (hasChanges) {
        await chrome.storage.local.set({ [STORAGE_KEY]: recordings });
        console.log('Migração de executionLogs concluída');
      }
    } catch (error) {
      console.error('Erro ao migrar executionLogs:', error);
    }
  }
}

// Exporta instância única
export const recordingStore = RecordingStore.getInstance();
