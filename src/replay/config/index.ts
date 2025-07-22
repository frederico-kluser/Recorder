/**
 * Gerenciamento de configuração do sistema de replay
 */

import { ReplayConfig, DEFAULT_REPLAY_CONFIG } from './default';

const CONFIG_STORAGE_KEY = 'ds_replay_cfg';

class ConfigManager {
  private config: ReplayConfig = DEFAULT_REPLAY_CONFIG;
  private initialized = false;

  /**
   * Inicializa o gerenciador de configuração
   */
  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      const stored = await chrome.storage.sync.get(CONFIG_STORAGE_KEY);
      if (stored[CONFIG_STORAGE_KEY]) {
        this.config = this.mergeConfig(
          DEFAULT_REPLAY_CONFIG,
          stored[CONFIG_STORAGE_KEY]
        );
      }
      this.initialized = true;
    } catch (error) {
      console.error('[ConfigManager] Erro ao carregar configuração:', error);
      this.config = DEFAULT_REPLAY_CONFIG;
    }
  }

  /**
   * Obtém a configuração atual
   */
  getConfig(): ReplayConfig {
    return { ...this.config };
  }

  /**
   * Atualiza a configuração
   */
  async setConfig(updates: Partial<ReplayConfig>): Promise<void> {
    this.config = this.mergeConfig(this.config, updates);

    try {
      await chrome.storage.sync.set({ [CONFIG_STORAGE_KEY]: this.config });
    } catch (error) {
      console.error('[ConfigManager] Erro ao salvar configuração:', error);
    }
  }

  /**
   * Reseta para configuração padrão
   */
  async resetConfig(): Promise<void> {
    this.config = DEFAULT_REPLAY_CONFIG;

    try {
      await chrome.storage.sync.remove(CONFIG_STORAGE_KEY);
    } catch (error) {
      console.error('[ConfigManager] Erro ao resetar configuração:', error);
    }
  }

  /**
   * Merge recursivo de configurações
   */
  private mergeConfig(
    target: ReplayConfig,
    source: Partial<ReplayConfig>
  ): ReplayConfig {
    const result = { ...target };

    for (const key in source) {
      if (
        source.hasOwnProperty(key) &&
        source[key as keyof ReplayConfig] !== undefined
      ) {
        (result as any)[key] = source[key as keyof ReplayConfig];
      }
    }

    return result;
  }
}

// Singleton
export const configManager = new ConfigManager();

// Hooks públicos
export async function getReplayConfig(): Promise<ReplayConfig> {
  await configManager.init();
  return configManager.getConfig();
}

export async function setReplayConfig(
  updates: Partial<ReplayConfig>
): Promise<void> {
  await configManager.init();
  return configManager.setConfig(updates);
}

export async function resetReplayConfig(): Promise<void> {
  await configManager.init();
  return configManager.resetConfig();
}
