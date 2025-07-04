/**
 * Service facade para gerenciar gravações
 * Abstrai a complexidade do storage e fornece uma API simples
 */

import { RecordingEntry } from '../types/recording';
import { Action } from '../types';
import { recordingStore } from './recording-store';
import { genCode } from '../builders';
import { ScriptType } from '../types';

/**
 * Service para operações de gravação
 */
export class RecordingService {
  /**
   * Cria e salva uma nova gravação
   */
  static async createRecording(
    actions: Action[],
    url: string,
    startedAt?: number,
    endedAt?: number
  ): Promise<RecordingEntry> {
    if (!actions || actions.length === 0) {
      throw new Error('Gravação vazia não pode ser salva');
    }

    // Extrai hostname da URL
    let hostname = 'localfile';
    try {
      if (url && url !== 'unknown') {
        const urlObj = new URL(url);
        hostname = urlObj.hostname || 'localfile';
      }
    } catch (e) {
      // URL inválida, mantém hostname padrão
    }

    // Gera timestamp e formata nome
    const now = endedAt || Date.now();
    const date = new Date(now);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    const dateStr = `${year}-${month}-${day}`;
    const timeStr = `${hours}-${minutes}`;
    
    // Cria ID único
    let id = `${hostname}:${dateStr}_${timeStr}`;
    
    // Verifica colisão e adiciona sufixo se necessário
    let suffix = 1;
    while (await recordingStore.get(id)) {
      id = `${hostname}:${dateStr}_${timeStr}_${suffix}`;
      suffix++;
    }

    // Gera código para cada framework
    const code = {
      cypress: genCode(actions, true, ScriptType.Cypress),
      playwright: genCode(actions, true, ScriptType.Playwright),
      puppeteer: genCode(actions, true, ScriptType.Puppeteer)
    };

    // Cria entrada da gravação
    const entry: RecordingEntry = {
      id,
      title: `${hostname} - ${dateStr} ${timeStr.replace('-', ':')}`,
      url,
      hostname,
      startedAt: startedAt || actions[0]?.timestamp || now,
      endedAt: now,
      actions,
      code
    };

    // Salva no store
    await recordingStore.save(entry);

    return entry;
  }

  /**
   * Lista todas as gravações
   */
  static async listRecordings(): Promise<RecordingEntry[]> {
    return recordingStore.list();
  }

  /**
   * Obtém uma gravação específica
   */
  static async getRecording(id: string): Promise<RecordingEntry | null> {
    return recordingStore.get(id);
  }

  /**
   * Remove uma gravação
   */
  static async removeRecording(id: string): Promise<void> {
    return recordingStore.remove(id);
  }

  /**
   * Limpa todo o histórico
   */
  static async clearHistory(): Promise<void> {
    return recordingStore.clear();
  }

  /**
   * Retorna o número total de gravações
   */
  static async getRecordingCount(): Promise<number> {
    const recordings = await recordingStore.list();
    return recordings.length;
  }

  /**
   * Busca gravações por hostname
   */
  static async searchByHostname(hostname: string): Promise<RecordingEntry[]> {
    const recordings = await recordingStore.list();
    return recordings.filter(r => 
      r.hostname.toLowerCase().includes(hostname.toLowerCase())
    );
  }

  /**
   * Busca gravações por período
   */
  static async searchByDateRange(startDate: Date, endDate: Date): Promise<RecordingEntry[]> {
    const recordings = await recordingStore.list();
    const start = startDate.getTime();
    const end = endDate.getTime();
    
    return recordings.filter(r => 
      r.startedAt >= start && r.startedAt <= end
    );
  }

  /**
   * Exporta gravações em formato JSON
   */
  static async exportRecordings(ids?: string[]): Promise<string> {
    let recordings: RecordingEntry[];
    
    if (ids && ids.length > 0) {
      recordings = [];
      for (const id of ids) {
        const recording = await recordingStore.get(id);
        if (recording) {
          recordings.push(recording);
        }
      }
    } else {
      recordings = await recordingStore.list();
    }
    
    return JSON.stringify(recordings, null, 2);
  }
}