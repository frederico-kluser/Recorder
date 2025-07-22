import { ExportConfig } from '../pages/types/package';

export const DEFAULT_EXPORT_CONFIG: ExportConfig = {
  compressScreenshots: false,
  compressionQuality: 0.8,
  includeMeta: true,
  includeScreenshots: true,
};

export interface ExportPluginHook {
  onBeforePack?: (data: any) => any;
  onAfterUnpack?: (data: any) => any;
}

export class ExportPluginRegistry {
  private static instance: ExportPluginRegistry;
  private plugins: ExportPluginHook[] = [];

  private constructor() {}

  static getInstance(): ExportPluginRegistry {
    if (!ExportPluginRegistry.instance) {
      ExportPluginRegistry.instance = new ExportPluginRegistry();
    }
    return ExportPluginRegistry.instance;
  }

  register(plugin: ExportPluginHook): void {
    this.plugins.push(plugin);
  }

  unregister(plugin: ExportPluginHook): void {
    const index = this.plugins.indexOf(plugin);
    if (index !== -1) {
      this.plugins.splice(index, 1);
    }
  }

  async runBeforePack(data: any): Promise<any> {
    let result = data;
    for (const plugin of this.plugins) {
      if (plugin.onBeforePack) {
        result = await plugin.onBeforePack(result);
      }
    }
    return result;
  }

  async runAfterUnpack(data: any): Promise<any> {
    let result = data;
    for (const plugin of this.plugins) {
      if (plugin.onAfterUnpack) {
        result = await plugin.onAfterUnpack(result);
      }
    }
    return result;
  }
}
