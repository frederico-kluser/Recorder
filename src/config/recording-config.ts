/**
 * Configurações para gravação e replay
 */

export interface ViewportConfig {
  width: number;
  height: number;
  isMobile?: boolean;
}

export interface RecordingConfig {
  // Configurações de viewport
  defaultViewport: ViewportConfig;
  mobileViewport: ViewportConfig;
  desktopViewport: ViewportConfig;

  // Configurações de thumbnail
  thumbMaxPx: number;
  errorIcon: string;

  // Configurações de armazenamento
  maxScreenshotSize: number; // em bytes
  maxRecordings: number;
  pruneOldScreenshots: boolean;
}

// Configuração padrão
export const DEFAULT_RECORDING_CONFIG: RecordingConfig = {
  defaultViewport: {
    width: 1280,
    height: 800,
    isMobile: false,
  },
  mobileViewport: {
    width: 375,
    height: 667,
    isMobile: true,
  },
  desktopViewport: {
    width: 1280,
    height: 800,
    isMobile: false,
  },
  thumbMaxPx: 96,
  errorIcon: '/assets/img-broken.svg',
  maxScreenshotSize: 5 * 1024 * 1024, // 5MB
  maxRecordings: 50,
  pruneOldScreenshots: true,
};

/**
 * Singleton para gerenciar configurações
 */
export class ConfigManager {
  private static instance: ConfigManager;
  private config: RecordingConfig = DEFAULT_RECORDING_CONFIG;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Carrega configurações do storage
   */
  async loadConfig(): Promise<void> {
    try {
      const result = await chrome.storage.sync.get('recordingConfig');
      if (result.recordingConfig) {
        this.config = {
          ...DEFAULT_RECORDING_CONFIG,
          ...result.recordingConfig,
        };
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }

  /**
   * Salva configurações no storage
   */
  async saveConfig(updates: Partial<RecordingConfig>): Promise<void> {
    try {
      this.config = { ...this.config, ...updates };
      await chrome.storage.sync.set({ recordingConfig: this.config });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  }

  /**
   * Obtém a configuração atual
   */
  getConfig(): RecordingConfig {
    return { ...this.config };
  }

  /**
   * Obtém viewport baseado no modo
   */
  getViewport(isMobile?: boolean): ViewportConfig {
    if (isMobile === undefined) {
      return this.config.defaultViewport;
    }
    return isMobile ? this.config.mobileViewport : this.config.desktopViewport;
  }
}

export const configManager = ConfigManager.getInstance();
