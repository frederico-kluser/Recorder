import { setEndRecordingStorage, localStorageGet } from './utils';
import { genCypressCode } from '../builders';
import { RecordingService } from '../storage/recording-service';
import { Action } from '../types';

export async function endRecording() {
  const { recording, returnTabId, recordingStartTime, firstUrl } = await localStorageGet([
    'recording',
    'returnTabId',
    'recordingStartTime',
    'firstUrl',
  ]);

  // Salva a gravação no histórico se houver ações gravadas
  if (recording && recording.length > 0) {
    try {
      // SEMPRE usa a primeira URL capturada que foi salva no início da gravação
      const urlOriginal = firstUrl;
      
      if (!urlOriginal) {
        console.error('URL inicial não encontrada. Gravação não será salva.');
        return;
      }
      
      // Cria a entrada no histórico com a URL original
      await RecordingService.createRecording(
        recording as Action[],
        urlOriginal,
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
