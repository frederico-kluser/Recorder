import React, { useEffect, useState } from 'react';

import {
  setPreferredLibraryStorage,
  setPreferredBarPositionStorage,
  localStorageGet,
  localStorageSet,
} from './utils';
import { ScriptType, BarPosition } from '../types';
import { TimingConfig, DEFAULT_TIMING_CONFIG } from '../types/config';

import type { Action } from '../types';

export function usePreferredLibrary() {
  // Sempre retorna Cypress como biblioteca fixa
  const [preferredLibrary, setPreferredLibrary] = useState<ScriptType>(
    ScriptType.Cypress
  );

  useEffect(() => {
    // Garante que sempre use Cypress, mesmo se houver valor antigo no storage
    localStorageGet(['preferredLibrary']).then(() => {
      setPreferredLibrary(ScriptType.Cypress);
      setPreferredLibraryStorage(ScriptType.Cypress);
    });
  }, []);

  const setPreferredLibraryWithStorage = (library: ScriptType) => {
    // Ignora o parâmetro e sempre usa Cypress
    setPreferredLibrary(ScriptType.Cypress);
    setPreferredLibraryStorage(ScriptType.Cypress);
  };

  return [preferredLibrary, setPreferredLibraryWithStorage] as const;
}

export function usePreferredBarPosition(defaultPosition: BarPosition) {
  const [preferredBarPosition, setPreferredBarPosition] =
    useState<BarPosition | null>(defaultPosition);

  useEffect(() => {
    localStorageGet(['preferredBarPosition']).then(
      ({ preferredBarPosition: storedPreferredBarPosition }) => {
        setPreferredBarPosition(storedPreferredBarPosition ?? defaultPosition);
      }
    );
  }, []);

  const setPreferredBarPositionWithStorage = (barPosition: BarPosition) => {
    setPreferredBarPosition(barPosition);
    setPreferredBarPositionStorage(barPosition);
  };

  return [preferredBarPosition, setPreferredBarPositionWithStorage] as const;
}

export function useRecordingState() {
  const [recordingTabId, setRecordingTabId] = useState<number | null>(null);
  const [actions, setActions] = useState<Action[]>([]);

  useEffect(() => {
    localStorageGet(['recording', 'recordingTabId']).then(
      ({ recording, recordingTabId }) => {
        setActions(recording ?? []);
        setRecordingTabId(recordingTabId ?? null);
      }
    );

    chrome.storage.onChanged.addListener((changes) => {
      if (
        changes.recordingTabId != null &&
        changes.recordingTabId.newValue != changes.recordingTabId.oldValue
      ) {
        setRecordingTabId(changes.recordingTabId.newValue);
      }
      if (
        changes.recording != null &&
        changes.recording.newValue != changes.recording.oldValue
      ) {
        setActions(changes.recording.newValue);
      }
    });
  }, []);

  return [recordingTabId, actions] as const;
}

/**
 * Hook para gerenciar configurações de timing
 */
export function useTimingConfig() {
  const [timingConfig, setTimingConfig] = useState<TimingConfig>(DEFAULT_TIMING_CONFIG);

  useEffect(() => {
    localStorageGet(['timingConfig']).then(({ timingConfig: storedConfig }) => {
      if (storedConfig) {
        setTimingConfig({
          ...DEFAULT_TIMING_CONFIG,
          ...storedConfig
        });
      }
    });
  }, []);

  const setTimingConfigWithStorage = (config: Partial<TimingConfig>) => {
    const newConfig = { ...timingConfig, ...config };
    setTimingConfig(newConfig);
    localStorageSet({ timingConfig: newConfig });
  };

  return [timingConfig, setTimingConfigWithStorage] as const;
}
