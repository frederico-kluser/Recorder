/**
 * Service facade para gerenciar gravações
 * Abstrai a complexidade do storage e fornece uma API simples
 */

import { RecordingEntry } from '../types/recording';
import { Action } from '../types';
import { recordingStore } from './recording-store';
import { genCypressCode, genCypressCodeWithTemplate } from '../builders';

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

    // Gera código apenas para Cypress (mantém a versão antiga para compatibilidade)
    const code = {
      cypress: genCypressCode(actions, true),
      // Nova versão com template - será usada no download
      cypressTemplate: genCypressCodeWithTemplate(
        actions,
        {
          testName: `${hostname} - ${dateStr} ${timeStr.replace('-', ':')}`,
          url: url, // Usa a URL original
          exportOptions: {
            viewportWidth: 1366,
            viewportHeight: 768,
          },
        },
        true
      ),
    };

    // Cria entrada da gravação com urlOriginal como campo principal
    const entry: RecordingEntry = {
      id,
      title: `${hostname} - ${dateStr} ${timeStr.replace('-', ':')}`,
      urlOriginal: url, // Campo principal com a URL inicial
      url: url, // Mantém para compatibilidade temporária
      hostname,
      startedAt: startedAt || actions[0]?.timestamp || now,
      endedAt: now,
      actions,
      code,
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
    return recordings.filter((r) =>
      r.hostname.toLowerCase().includes(hostname.toLowerCase())
    );
  }

  /**
   * Busca gravações por período
   */
  static async searchByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<RecordingEntry[]> {
    const recordings = await recordingStore.list();
    const start = startDate.getTime();
    const end = endDate.getTime();

    return recordings.filter((r) => r.startedAt >= start && r.startedAt <= end);
  }

  /**
   * Exporta gravações em formato JSON
   * @deprecated Use PackageRecorder.exportAll() or exportByIds() instead
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

  /**
   * Exporta múltiplas gravações selecionadas para JSON
   * @param selectedIds Array de IDs das gravações selecionadas
   * @returns JSON string das gravações exportadas
   */
  static async exportMany(selectedIds: string[]): Promise<string> {
    try {
      console.log(
        '🚀 Iniciando exportação de gravações selecionadas:',
        selectedIds
      );

      if (!selectedIds || selectedIds.length === 0) {
        throw new Error('Nenhuma gravação selecionada para exportação');
      }

      const recordings: RecordingEntry[] = [];

      for (const id of selectedIds) {
        try {
          const recording = await recordingStore.get(id);
          if (recording) {
            recordings.push(recording);
            console.log(`✅ Gravação ${id} exportada com sucesso`);
          } else {
            console.warn(`⚠️ Gravação ${id} não encontrada`);
          }
        } catch (error) {
          console.error(`❌ Erro ao exportar gravação ${id}:`, error);
          throw new Error(`Erro ao buscar gravação ${id}: ${error}`);
        }
      }

      if (recordings.length === 0) {
        throw new Error('Nenhuma gravação válida encontrada para exportação');
      }

      const exportData = {
        exported_at: new Date().toISOString(),
        count: recordings.length,
        recordings: recordings,
      };

      console.log(`✅ Exportação concluída: ${recordings.length} gravações`);
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      console.error('❌ Erro na exportação em lote:', error);
      throw error;
    }
  }

  /**
   * Importa múltiplas gravações de um arquivo JSON
   * @param jsonContent String JSON com as gravações
   * @returns Array de IDs das gravações importadas com sucesso
   */
  static async importMany(jsonContent: string): Promise<string[]> {
    try {
      console.log('🚀 Iniciando importação de gravações em lote');

      if (!jsonContent || jsonContent.trim() === '') {
        throw new Error('Conteúdo JSON vazio');
      }

      let parsedData: any;
      try {
        parsedData = JSON.parse(jsonContent);
      } catch (parseError) {
        console.error('❌ Erro ao fazer parse do JSON:', parseError);
        throw new Error('Formato JSON inválido');
      }

      // Suporta tanto formato novo (com metadata) quanto formato antigo (array direto)
      let recordings: any[];
      if (Array.isArray(parsedData)) {
        recordings = parsedData;
      } else if (
        parsedData.recordings &&
        Array.isArray(parsedData.recordings)
      ) {
        recordings = parsedData.recordings;
      } else {
        throw new Error(
          'Formato de arquivo inválido: deve conter um array de gravações'
        );
      }

      if (recordings.length === 0) {
        throw new Error('Nenhuma gravação encontrada no arquivo');
      }

      const importedIds: string[] = [];
      const errors: string[] = [];

      for (let i = 0; i < recordings.length; i++) {
        const recording = recordings[i];

        try {
          // Validação básica do formato da gravação
          if (!recording || typeof recording !== 'object') {
            throw new Error('Formato de gravação inválido');
          }

          if (!recording.actions || !Array.isArray(recording.actions)) {
            throw new Error('Campo "actions" obrigatório e deve ser um array');
          }

          if (!recording.url || typeof recording.url !== 'string') {
            throw new Error('Campo "url" obrigatório');
          }

          // Gera novo ID para evitar conflitos
          const existingRecording = recording.id
            ? await recordingStore.get(recording.id)
            : null;
          let finalId = recording.id;

          if (existingRecording) {
            // Se já existe, gera novo ID baseado no timestamp
            finalId = `imported_${Date.now()}_${Math.random()
              .toString(36)
              .substr(2, 9)}`;
            console.log(
              `⚠️ Gravação ${recording.id} já existe, novo ID: ${finalId}`
            );
          }

          // Extrai hostname para compatibilidade
          let hostname = 'localfile';
          try {
            if (recording.url && recording.url !== 'unknown') {
              const urlObj = new URL(recording.url);
              hostname = urlObj.hostname || 'localfile';
            }
          } catch (e) {
            // URL inválida, mantém hostname padrão
          }

          // Gera título baseado no hostname e timestamp
          const date = new Date(
            recording.createdAt || recording.startedAt || Date.now()
          );
          const dateStr = date.toLocaleDateString('pt-BR');
          const timeStr = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          });
          const title =
            recording.title || `${hostname} - ${dateStr} ${timeStr}`;

          const recordingEntry: RecordingEntry = {
            id:
              finalId ||
              `imported_${Date.now()}_${Math.random()
                .toString(36)
                .substr(2, 9)}`,
            title: title,
            urlOriginal:
              recording.urlOriginal ||
              recording.firstUrl ||
              recording.url ||
              'unknown', // Campo principal
            url: recording.url, // Mantém para compatibilidade
            hostname: hostname,
            startedAt: recording.startedAt || recording.createdAt || Date.now(),
            endedAt: recording.endedAt || recording.createdAt || Date.now(),
            actions: recording.actions,
            code: {
              cypress:
                recording.cypressCode ||
                recording.code?.cypress ||
                genCypressCode(recording.actions),
              cypressTemplate:
                recording.code?.cypressTemplate ||
                genCypressCodeWithTemplate(
                  recording.actions,
                  {
                    testName: title,
                    url:
                      recording.urlOriginal ||
                      recording.firstUrl ||
                      recording.url ||
                      'unknown', // Usa URL original
                    exportOptions: {
                      viewportWidth: 1366,
                      viewportHeight: 768,
                    },
                  },
                  true
                ),
            },
          };

          await recordingStore.save(recordingEntry);
          importedIds.push(recordingEntry.id);
          console.log(
            `✅ Gravação "${recordingEntry.title}" importada com sucesso (ID: ${recordingEntry.id})`
          );
        } catch (recordingError) {
          const errorMsg = `Erro na gravação ${i + 1}: ${recordingError}`;
          errors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }

      if (importedIds.length === 0) {
        throw new Error(
          `Nenhuma gravação foi importada com sucesso. Erros: ${errors.join(
            '; '
          )}`
        );
      }

      if (errors.length > 0) {
        console.warn(
          `⚠️ Importação parcial: ${importedIds.length} sucessos, ${errors.length} erros`
        );
      }

      console.log(
        `✅ Importação concluída: ${importedIds.length} gravações importadas`
      );
      return importedIds;
    } catch (error) {
      console.error('❌ Erro na importação em lote:', error);
      throw error;
    }
  }
}
