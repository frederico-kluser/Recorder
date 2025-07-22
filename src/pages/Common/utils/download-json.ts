import { PackageRecorder } from '../../../export/package-recorder';
import { RecordingUnpacker } from '../../../import/unpack-recorder';
import { ExportConfig } from '../../types/package';
import { DEFAULT_EXPORT_CONFIG } from '../../../config/export-config';

/**
 * Downloads a recording package with all its executions
 */
export async function downloadRecordingPackage(
  recordingId: string,
  config: Partial<ExportConfig> = {}
): Promise<void> {
  try {
    const packageRecorder = PackageRecorder.getInstance();
    const mergedConfig = { ...DEFAULT_EXPORT_CONFIG, ...config };

    // Create the package blob
    const blob = await packageRecorder.exportSingle(recordingId, mergedConfig);

    // Generate filename
    const filename = packageRecorder.getFileName();

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    console.log(`Downloaded recording package: ${filename}`);
  } catch (error) {
    console.error('Error downloading recording package:', error);
    throw error;
  }
}

/**
 * Downloads all recordings as a package
 */
export async function downloadAllRecordings(
  config: Partial<ExportConfig> = {}
): Promise<void> {
  try {
    const packageRecorder = PackageRecorder.getInstance();
    const mergedConfig = { ...DEFAULT_EXPORT_CONFIG, ...config };

    // Create the package blob
    const blob = await packageRecorder.exportAll(mergedConfig);

    // Generate filename
    const filename = packageRecorder.getFileName('all_recordings');

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    console.log(`Downloaded all recordings package: ${filename}`);
  } catch (error) {
    console.error('Error downloading all recordings:', error);
    throw error;
  }
}

/**
 * Imports recordings from a file
 */
export async function importRecordingsFromFile(file: File): Promise<{
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
}> {
  try {
    const unpacker = new RecordingUnpacker();
    const result = await unpacker.unpackFromFile(file);

    if (result.success) {
      console.log(`Successfully imported ${result.imported} recordings`);
    } else {
      console.error('Import failed:', result.errors);
    }

    return result;
  } catch (error) {
    console.error('Error importing recordings:', error);
    return {
      success: false,
      imported: 0,
      failed: 0,
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

/**
 * Creates a file input for importing recordings
 */
export function createImportInput(
  onImport: (result: any) => void
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.dpsnap,.json';
  input.style.display = 'none';

  input.addEventListener('change', async (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const result = await importRecordingsFromFile(file);
      onImport(result);
    }
  });

  return input;
}
