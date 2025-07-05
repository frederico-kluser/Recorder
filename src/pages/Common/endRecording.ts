import { setEndRecordingStorage, localStorageGet } from './utils';
import { genCypressCode } from '../builders';
import { RecordingService } from '../storage/recording-service';
import { Action } from '../types';

export async function endRecording() {
  const { recording, returnTabId, recordingStartTime } = await localStorageGet([
    'recording',
    'returnTabId',
    'recordingStartTime',
  ]);

  // Salva a gravação no histórico se houver ações gravadas
  if (recording && recording.length > 0) {
    try {
      // Obtém a URL atual da aba ativa
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = activeTab?.url || 'unknown';
      
      // Cria a entrada no histórico
      await RecordingService.createRecording(
        recording as Action[],
        url,
        recordingStartTime || recording[0]?.timestamp,
        Date.now()
      );
    } catch (error) {
      console.error('Erro ao salvar gravação no histórico:', error);
    }
  }

  // Limpa o storage da gravação atual
  setEndRecordingStorage();

  // We need to send the generated recording back to the webapp
  if (returnTabId != null) {
    const code = genCypressCode(recording, true);

    chrome.runtime.sendMessage({
      type: 'forward-recording',
      tabId: returnTabId,
      code,
      actions: recording,
    });
  }
}
