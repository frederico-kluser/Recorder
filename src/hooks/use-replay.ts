/**
 * Hook React para gerenciar funcionalidade de replay no popup
 * Coordena comunicação com background script e atualização de UI
 */

import { useState, useEffect, useCallback } from 'react';
import type { ReplayState, ReplayRequest, ReplayStatusUpdate, ReplayMode } from '../types/replay.js';

interface UseReplayResult {
  replayState: ReplayState | null;
  isReplaying: boolean;
  replayTabId: number | null;
  startReplay: (recordingId: string, mode?: ReplayMode) => Promise<void>;
  stopReplay: () => void;
  error: string | null;
}

const initialState: ReplayState = {
  status: 'idle',
  currentStepIndex: 0,
  totalSteps: 0,
  startTime: null
};

/**
 * Hook para gerenciar replay de gravações
 */
export function useReplay(): UseReplayResult {
  const [replayState, setReplayState] = useState<ReplayState | null>(null);
  const [replayTabId, setReplayTabId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Configura listener para atualizações de status
  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.type === 'REPLAY_STATUS') {
        const statusUpdate = message as ReplayStatusUpdate;
        
        // Atualiza estado apenas se for da aba atual
        if (replayTabId === null || statusUpdate.tabId === replayTabId) {
          setReplayState(statusUpdate.state);
          
          // Limpa erro se status mudou para sucesso
          if (statusUpdate.state.status === 'completed') {
            setError(null);
          }
          
          // Define erro se status mudou para erro
          if (statusUpdate.state.status === 'error' && statusUpdate.state.error) {
            setError(statusUpdate.state.error);
          }
        }
      }
    };
    
    chrome.runtime.onMessage.addListener(handleMessage);
    
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [replayTabId]);
  
  // Limpa estado quando aba é fechada
  useEffect(() => {
    if (!replayTabId) return;
    
    const handleTabRemoved = (tabId: number) => {
      if (tabId === replayTabId) {
        setReplayState(null);
        setReplayTabId(null);
        setError(null);
      }
    };
    
    chrome.tabs.onRemoved.addListener(handleTabRemoved);
    
    return () => {
      chrome.tabs.onRemoved.removeListener(handleTabRemoved);
    };
  }, [replayTabId]);
  
  /**
   * Inicia replay de uma gravação
   */
  const startReplay = useCallback(async (recordingId: string, mode?: ReplayMode): Promise<void> => {
    try {
      setError(null);
      setReplayState({
        ...initialState,
        status: 'preparing'
      });
      
      // Envia requisição para background
      const request: ReplayRequest = {
        type: 'REPLAY_REQUEST',
        recordingId,
        mode
      };
      
      const response = await chrome.runtime.sendMessage(request) as { success: boolean; error?: string; tabId?: number } | undefined;
      
      if (!response || !response.success) {
        throw new Error(response?.error || 'Falha ao iniciar replay');
      }
      
      // Armazena ID da aba
      if (response.tabId !== undefined) {
        setReplayTabId(response.tabId);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      setReplayState({
        ...initialState,
        status: 'error',
        error: errorMessage
      });
      throw err;
    }
  }, []);
  
  /**
   * Para replay em execução
   */
  const stopReplay = useCallback((): void => {
    if (replayTabId) {
      // Fecha aba do replay
      chrome.tabs.remove(replayTabId).catch(() => {
        // Ignora erro se aba já foi fechada
      });
      
      // Limpa estado
      setReplayState(null);
      setReplayTabId(null);
      setError(null);
    }
  }, [replayTabId]);
  
  // Calcula se está em replay ativo
  const isReplaying = replayState !== null && 
    replayState.status !== 'idle' && 
    replayState.status !== 'completed' &&
    replayState.status !== 'error';
  
  return {
    replayState,
    isReplaying,
    replayTabId,
    startReplay,
    stopReplay,
    error
  };
}