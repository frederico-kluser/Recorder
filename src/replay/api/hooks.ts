/**
 * React hooks para integração com o sistema de replay
 */

import { useState, useEffect, useCallback } from 'react';
import { ReplayStatus, ReplayProgress } from '../types/session';
import { ReplayMessage, ReplayMessageType } from '../types/events';
import { startReplay, pauseReplay, resumeReplay, stopReplay } from './index';
import { CacheMode } from '../types/session';

export interface UseReplayState {
  sessionId: string | null;
  status: ReplayStatus;
  progress: number;
  error: string | null;
  isLoading: boolean;
}

export interface UseReplayActions {
  start: (recordingId: string, cleanCache?: boolean) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  stop: () => Promise<void>;
}

export function useReplay(): [UseReplayState, UseReplayActions] {
  const [state, setState] = useState<UseReplayState>({
    sessionId: null,
    status: ReplayStatus.IDLE,
    progress: 0,
    error: null,
    isLoading: false,
  });

  // Listener para mensagens do background
  useEffect(() => {
    const handleMessage = (message: ReplayMessage) => {
      switch (message.type) {
        case ReplayMessageType.REPLAY_PROGRESS:
          if (message.progress.sessionId === state.sessionId) {
            setState((prev) => ({
              ...prev,
              status: message.progress.status,
              progress:
                (message.progress.currentActionIndex /
                  message.progress.totalActions) *
                100,
              error: message.progress.error || null,
            }));
          }
          break;

        case ReplayMessageType.REPLAY_COMPLETED:
          if (message.result.sessionId === state.sessionId) {
            setState((prev) => ({
              ...prev,
              status: ReplayStatus.COMPLETED,
              progress: 100,
              error: null,
              isLoading: false,
            }));
          }
          break;

        case ReplayMessageType.REPLAY_ERROR:
          if (message.sessionId === state.sessionId) {
            setState((prev) => ({
              ...prev,
              status: ReplayStatus.ERROR,
              error: message.error,
              isLoading: false,
            }));
          }
          break;
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => chrome.runtime.onMessage.removeListener(handleMessage);
  }, [state.sessionId]);

  const start = useCallback(
    async (recordingId: string, cleanCache: boolean = false) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const sessionId = await startReplay(recordingId, {
          cacheMode: cleanCache ? CacheMode.CLEAN_CACHE : CacheMode.KEEP_CACHE,
          autoScroll: true,
          maxRetries: 3,
          retryDelay: 1000,
        });

        setState({
          sessionId,
          status: ReplayStatus.RUNNING,
          progress: 0,
          error: null,
          isLoading: false,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error.message : 'Failed to start replay',
          isLoading: false,
        }));
      }
    },
    []
  );

  const pause = useCallback(async () => {
    if (!state.sessionId) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await pauseReplay(state.sessionId);
      setState((prev) => ({
        ...prev,
        status: ReplayStatus.PAUSED,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to pause replay',
        isLoading: false,
      }));
    }
  }, [state.sessionId]);

  const resume = useCallback(async () => {
    if (!state.sessionId) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await resumeReplay(state.sessionId);
      setState((prev) => ({
        ...prev,
        status: ReplayStatus.RUNNING,
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error:
          error instanceof Error ? error.message : 'Failed to resume replay',
        isLoading: false,
      }));
    }
  }, [state.sessionId]);

  const stop = useCallback(async () => {
    if (!state.sessionId) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await stopReplay(state.sessionId);
      setState({
        sessionId: null,
        status: ReplayStatus.IDLE,
        progress: 0,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to stop replay',
        isLoading: false,
      }));
    }
  }, [state.sessionId]);

  return [state, { start, pause, resume, stop }];
}
