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
  currentStep: 0,
  totalSteps: 0,
  tabId: -1
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
        console.log('[useReplay] Received REPLAY_STATUS:', message);
        
        // Atualiza estado com base na mensagem
        if (replayTabId === null || message.tabId === replayTabId) {
          setReplayState({
            status: message.status || 'running',
            currentStep: message.currentStep || 0,
            totalSteps: message.totalSteps || 0,
            tabId: message.tabId || replayTabId || -1,
            error: message.error
          });
          
          // Limpa erro se status mudou para sucesso
          if (message.status === 'completed') {
            setError(null);
          }
          
          // Define erro se status mudou para erro
          if (message.status === 'error' && message.error) {
            setError(message.error);
          }
        }
      } else if (message.type === 'REPLAY_RESULT') {
        console.log('[useReplay] Received REPLAY_RESULT:', message);
        
        if (replayTabId === null || message.tabId === replayTabId) {
          if (message.success) {
            setReplayState(prev => prev ? { ...prev, status: 'completed' } : null);
            setError(null);
          } else {
            setReplayState(prev => prev ? { ...prev, status: 'error', error: message.error } : null);
            setError(message.error || 'Replay failed');
          }
        }
      } else if (message.type === 'BG_STATUS') {
        // Logs do background para debugging
        console.log('[useReplay] Background logs:', message.logs);
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