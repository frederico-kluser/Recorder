import { RecordingStore } from '../pages/storage/recording-store';
import {
  RecordingPackage,
  RecordingWithExecutions,
  ExportConfig,
  PACKAGE_VERSION,
  PACKAGE_FILE_EXTENSION,
} from '../pages/types/package';
import { RecordingEntry } from '../pages/types/recording';
import { ExecutionLog } from '../pages/types/execution';

export class RecordingPackageBuilder {
  private recordings: RecordingWithExecutions[] = [];
  private config: ExportConfig;

  constructor(config: Partial<ExportConfig> = {}) {
    this.config = {
      compressScreenshots: false,
      compressionQuality: 0.8,
      includeMeta: true,
      includeScreenshots: true,
      ...config,
    };
  }

  addRecording(recording: RecordingEntry, executionLogs: ExecutionLog[]): void {
    const processedLogs = this.config.includeScreenshots
      ? executionLogs
      : executionLogs.map((log) => ({
          ...log,
          screenshot: undefined,
        }));

    this.recordings.push({
      recording,
      executionLogs: processedLogs,
    });
  }

  build(): RecordingPackage {
    return {
      version: PACKAGE_VERSION,
      exportedAt: Date.now(),
      recordings: this.recordings,
    };
  }

  private calculateChecksum(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  async toBlob(): Promise<Blob> {
    const packageData = this.build();
    const jsonString = JSON.stringify(packageData, null, 2);
    packageData.checksum = this.calculateChecksum(jsonString);

    const finalJson = JSON.stringify(packageData);
    return new Blob([finalJson], { type: 'application/json' });
  }
}

export class PackageRecorder {
  private static instance: PackageRecorder;
  private recordingStore: RecordingStore;

  private constructor() {
    this.recordingStore = RecordingStore.getInstance();
  }

  static getInstance(): PackageRecorder {
    if (!PackageRecorder.instance) {
      PackageRecorder.instance = new PackageRecorder();
    }
    return PackageRecorder.instance;
  }

  async exportAll(config?: Partial<ExportConfig>): Promise<Blob> {
    const builder = new RecordingPackageBuilder(config);
    const recordings = await this.recordingStore.getAllWithExecutions();

    for (const { recording, executionLogs } of recordings) {
      builder.addRecording(recording, executionLogs);
    }

    return builder.toBlob();
  }

  async exportByIds(
    recordingIds: string[],
    config?: Partial<ExportConfig>
  ): Promise<Blob> {
    const builder = new RecordingPackageBuilder(config);

    for (const id of recordingIds) {
      const recording = await this.recordingStore.get(id);
      if (recording) {
        const executionLogs = await this.recordingStore.getExecutionLogs(id);
        builder.addRecording(recording, executionLogs);
      }
    }

    return builder.toBlob();
  }

  async exportSingle(
    recordingId: string,
    config?: Partial<ExportConfig>
  ): Promise<Blob> {
    return this.exportByIds([recordingId], config);
  }

  getFileName(title?: string): string {
    const sanitized = title
      ? title.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      : 'recordings';
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return `${sanitized}_${timestamp}${PACKAGE_FILE_EXTENSION}`;
  }
}
