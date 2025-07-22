import { RecordingEntry } from './recording';
import { ExecutionLog } from './execution';

export interface RecordingPackage {
  version: string;
  exportedAt: number;
  checksum?: string;
  recordings: RecordingWithExecutions[];
}

export interface RecordingWithExecutions {
  recording: RecordingEntry;
  executionLogs: ExecutionLog[];
}

export interface ExportConfig {
  compressScreenshots: boolean;
  compressionQuality: number;
  includeMeta: boolean;
  includeScreenshots: boolean;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
}

export const PACKAGE_VERSION = '1.1.0';
export const PACKAGE_FILE_EXTENSION = '.dpsnap';

export class PackageValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PackageValidationError';
  }
}

export class PackageVersionError extends Error {
  constructor(version: string, expected: string) {
    super(`Unsupported package version: ${version}. Expected: ${expected}`);
    this.name = 'PackageVersionError';
  }
}
