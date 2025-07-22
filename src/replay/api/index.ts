/**
 * API pública para comunicação com o Popup
 * Exporta funções que enviam mensagens para o background
 */

import { ReplayOptions } from '../types/session';
import { ReplayCmdMessage, ReplayMessageType } from '../types/events';

/**
 * Inicia um novo replay
 */
export async function startReplay(
  recordingId: string,
  options: ReplayOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const message: ReplayCmdMessage = {
      type: ReplayMessageType.REPLAY_CMD,
      cmd: 'start',
      recordingId,
      options,
    };

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.error) {
        reject(new Error(response.error));
      } else if (response?.sessionId) {
        resolve(response.sessionId);
      } else {
        reject(new Error('Invalid response from background'));
      }
    });
  });
}

/**
 * Pausa um replay em execução
 */
export async function pauseReplay(sessionId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: ReplayCmdMessage = {
      type: ReplayMessageType.REPLAY_CMD,
      cmd: 'pause',
      sessionId,
    };

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.error) {
        reject(new Error(response.error));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Retoma um replay pausado
 */
export async function resumeReplay(sessionId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: ReplayCmdMessage = {
      type: ReplayMessageType.REPLAY_CMD,
      cmd: 'resume',
      sessionId,
    };

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.error) {
        reject(new Error(response.error));
      } else {
        resolve();
      }
    });
  });
}

/**
 * Para um replay em execução
 */
export async function stopReplay(sessionId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const message: ReplayCmdMessage = {
      type: ReplayMessageType.REPLAY_CMD,
      cmd: 'stop',
      sessionId,
    };

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.error) {
        reject(new Error(response.error));
      } else {
        resolve();
      }
    });
  });
}
