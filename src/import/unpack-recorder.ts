import { RecordingStore } from '../pages/storage/recording-store';
import { TransactionLock } from '../utils/transaction-lock';
import {
  RecordingPackage,
  RecordingWithExecutions,
  ImportResult,
  PackageValidationError,
  PackageVersionError,
  PACKAGE_VERSION,
} from '../pages/types/package';
import { RecordingEntry } from '../pages/types/recording';
import { ExecutionLog } from '../pages/types/execution';

export class RecordingUnpacker {
  private recordingStore: RecordingStore;
  private transactionLock: TransactionLock;

  constructor() {
    this.recordingStore = RecordingStore.getInstance();
    this.transactionLock = TransactionLock.getInstance();
  }

  private validatePackage(data: any): RecordingPackage {
    if (!data || typeof data !== 'object') {
      throw new PackageValidationError('Invalid package format');
    }

    if (!data.version) {
      throw new PackageValidationError('Missing package version');
    }

    if (data.version !== PACKAGE_VERSION) {
      if (data.version === '1.0.0') {
        return this.migrateFromV1(data);
      }
      throw new PackageVersionError(data.version, PACKAGE_VERSION);
    }

    if (!Array.isArray(data.recordings)) {
      throw new PackageValidationError('Invalid recordings format');
    }

    return data as RecordingPackage;
  }

  private migrateFromV1(data: any): RecordingPackage {
    const migrated: RecordingPackage = {
      version: PACKAGE_VERSION,
      exportedAt: data.exportedAt || Date.now(),
      recordings: [],
    };

    if (Array.isArray(data.recordings)) {
      migrated.recordings = data.recordings.map((item: any) => {
        if (item.recording && !item.executionLogs) {
          return {
            recording: item.recording,
            executionLogs: [],
          };
        }
        return item;
      });
    }

    return migrated;
  }

  private normalizeTimestamps(recording: RecordingEntry): RecordingEntry {
    return {
      ...recording,
      timestamp: this.ensureEpochMs(recording.timestamp),
      createdAt: recording.createdAt
        ? this.ensureEpochMs(recording.createdAt)
        : undefined,
    };
  }

  private normalizeExecutionLogs(logs: ExecutionLog[]): ExecutionLog[] {
    return logs.map((log) => ({
      ...log,
      timestamp: this.ensureEpochMs(log.timestamp),
      startTime: this.ensureEpochMs(log.startTime),
      endTime: log.endTime ? this.ensureEpochMs(log.endTime) : undefined,
      steps: log.steps.map((step) => ({
        ...step,
        timestamp: this.ensureEpochMs(step.timestamp),
      })),
    }));
  }

  private ensureEpochMs(timestamp: number): number {
    if (timestamp < 1e10) {
      return timestamp * 1000;
    }
    return timestamp;
  }

  private validateRecordingData(data: RecordingWithExecutions): boolean {
    const { recording, executionLogs } = data;

    if (!recording.id || !recording.urlOriginal) {
      return false;
    }

    if (!Array.isArray(recording.actions)) {
      return false;
    }

    if (!Array.isArray(executionLogs)) {
      return false;
    }

    return true;
  }

  async unpack(blob: Blob): Promise<ImportResult> {
    const result: ImportResult = {
      success: false,
      imported: 0,
      failed: 0,
      errors: [],
    };

    try {
      const text = await blob.text();
      const data = JSON.parse(text);
      const packageData = this.validatePackage(data);

      for (const recordingData of packageData.recordings) {
        try {
          if (!this.validateRecordingData(recordingData)) {
            result.failed++;
            result.errors.push(
              `Invalid recording data: ${
                recordingData.recording?.id || 'unknown'
              }`
            );
            continue;
          }

          const normalizedRecording = this.normalizeTimestamps(
            recordingData.recording
          );
          const normalizedLogs = this.normalizeExecutionLogs(
            recordingData.executionLogs
          );

          await this.transactionLock.withLock(
            `import-${normalizedRecording.id}`,
            async () => {
              await this.recordingStore.saveWithExecutions(
                normalizedRecording,
                normalizedLogs
              );
            }
          );

          result.imported++;
        } catch (error) {
          result.failed++;
          result.errors.push(
            `Failed to import recording: ${
              error instanceof Error ? error.message : 'Unknown error'
            }`
          );
        }
      }

      result.success = result.imported > 0;

      if (result.success) {
        window.dispatchEvent(new Event('import:complete'));
      }

      return result;
    } catch (error) {
      result.errors.push(
        `Package parsing error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      );
      return result;
    }
  }

  async unpackFromFile(file: File): Promise<ImportResult> {
    if (!file.name.endsWith('.dpsnap') && !file.name.endsWith('.json')) {
      return {
        success: false,
        imported: 0,
        failed: 0,
        errors: ['Invalid file type. Expected .dpsnap or .json file'],
      };
    }

    return this.unpack(file);
  }
}
