import { useState, useCallback } from 'react';
import { ExportConfig } from '../pages/types/package';
import { DEFAULT_EXPORT_CONFIG } from '../config/export-config';

export function useExportConfig() {
  const [config, setConfig] = useState<ExportConfig>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('exportConfig');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_EXPORT_CONFIG, ...parsed };
      } catch {
        return DEFAULT_EXPORT_CONFIG;
      }
    }
    return DEFAULT_EXPORT_CONFIG;
  });

  const updateConfig = useCallback((updates: Partial<ExportConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...updates };
      // Save to localStorage
      localStorage.setItem('exportConfig', JSON.stringify(newConfig));
      return newConfig;
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_EXPORT_CONFIG);
    localStorage.removeItem('exportConfig');
  }, []);

  return {
    config,
    updateConfig,
    resetConfig,
  };
}
