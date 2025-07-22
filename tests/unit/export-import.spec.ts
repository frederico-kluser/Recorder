import {
  RecordingPackageBuilder,
  PackageRecorder,
} from '../../src/export/package-recorder';
import { RecordingUnpacker } from '../../src/import/unpack-recorder';
import { RecordingStore } from '../../src/pages/storage/recording-store';
import { TransactionLock } from '../../src/utils/transaction-lock';
import { RecordingEntry } from '../../src/pages/types/recording';
import { ExecutionLog } from '../../src/pages/types/execution';
import { PACKAGE_VERSION } from '../../src/pages/types/package';

// Mock chrome.storage.local
global.chrome = {
  storage: {
    local: {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
      getBytesInUse: jest.fn(),
    },
  },
  runtime: {
    lastError: null,
  },
} as any;

// Mock window.dispatchEvent
global.window = {
  dispatchEvent: jest.fn(),
} as any;

jest.mock('../../src/pages/storage/recording-store');

describe('Export/Import Package System', () => {
  let mockRecordingStore: jest.Mocked<RecordingStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRecordingStore =
      RecordingStore.getInstance() as jest.Mocked<RecordingStore>;
  });

  describe('RecordingPackageBuilder', () => {
    it('should build a package with correct structure', () => {
      const builder = new RecordingPackageBuilder();
      const recording: RecordingEntry = {
        id: 'test-1',
        title: 'Test Recording',
        urlOriginal: 'https://example.com',
        url: 'https://example.com',
        hostname: 'example.com',
        startedAt: Date.now(),
        endedAt: Date.now() + 1000,
        actions: [],
        code: { cypress: '' },
      };

      const executionLogs: ExecutionLog[] = [
        {
          id: 'exec-1',
          timestamp: Date.now(),
          startTime: Date.now(),
          endTime: Date.now() + 500,
          meta: {
            id: 'exec-1',
            startedAt: Date.now(),
            endedAt: Date.now() + 500,
            stepCount: 1,
            hasErrors: false,
            url: 'https://example.com',
            title: 'Test',
          },
          steps: [
            {
              action: 'click',
              timestamp: Date.now(),
              selector: '#button',
              screenshot: 'data:image/png;base64,test',
            },
          ],
        },
      ];

      builder.addRecording(recording, executionLogs);
      const package_ = builder.build();

      expect(package_.version).toBe(PACKAGE_VERSION);
      expect(package_.exportedAt).toBeDefined();
      expect(package_.recordings).toHaveLength(1);
      expect(package_.recordings[0].recording).toEqual(recording);
      expect(package_.recordings[0].executionLogs).toEqual(executionLogs);
    });

    it('should exclude screenshots when configured', () => {
      const builder = new RecordingPackageBuilder({
        includeScreenshots: false,
      });
      const recording: RecordingEntry = {
        id: 'test-1',
        title: 'Test Recording',
        urlOriginal: 'https://example.com',
        url: 'https://example.com',
        hostname: 'example.com',
        startedAt: Date.now(),
        endedAt: Date.now() + 1000,
        actions: [],
        code: { cypress: '' },
      };

      const executionLogs: ExecutionLog[] = [
        {
          id: 'exec-1',
          timestamp: Date.now(),
          startTime: Date.now(),
          endTime: Date.now() + 500,
          meta: {
            id: 'exec-1',
            startedAt: Date.now(),
            endedAt: Date.now() + 500,
            stepCount: 1,
            hasErrors: false,
            url: 'https://example.com',
            title: 'Test',
          },
          steps: [
            {
              action: 'click',
              timestamp: Date.now(),
              selector: '#button',
              screenshot: 'data:image/png;base64,test',
            },
          ],
        },
      ];

      builder.addRecording(recording, executionLogs);
      const package_ = builder.build();

      expect(
        package_.recordings[0].executionLogs[0].steps[0].screenshot
      ).toBeUndefined();
    });
  });

  describe('RecordingUnpacker', () => {
    it('should validate and unpack valid package', async () => {
      const unpacker = new RecordingUnpacker();
      const packageData = {
        version: PACKAGE_VERSION,
        exportedAt: Date.now(),
        recordings: [
          {
            recording: {
              id: 'test-1',
              title: 'Test Recording',
              urlOriginal: 'https://example.com',
              url: 'https://example.com',
              hostname: 'example.com',
              startedAt: Date.now(),
              endedAt: Date.now() + 1000,
              actions: [],
              code: { cypress: '' },
            },
            executionLogs: [],
          },
        ],
      };

      const blob = new Blob([JSON.stringify(packageData)], {
        type: 'application/json',
      });

      mockRecordingStore.saveWithExecutions.mockResolvedValue(undefined);

      const result = await unpacker.unpack(blob);

      expect(result.success).toBe(true);
      expect(result.imported).toBe(1);
      expect(result.failed).toBe(0);
      expect(result.errors).toHaveLength(0);
      expect(mockRecordingStore.saveWithExecutions).toHaveBeenCalled();
    });

    it('should reject invalid package format', async () => {
      const unpacker = new RecordingUnpacker();
      const invalidData = { invalid: 'data' };
      const blob = new Blob([JSON.stringify(invalidData)], {
        type: 'application/json',
      });

      const result = await unpacker.unpack(blob);

      expect(result.success).toBe(false);
      expect(result.imported).toBe(0);
      expect(result.errors).toContain('Missing package version');
    });

    it('should handle version migration from 1.0.0', async () => {
      const unpacker = new RecordingUnpacker();
      const oldPackage = {
        version: '1.0.0',
        exportedAt: Date.now(),
        recordings: [
          {
            recording: {
              id: 'test-1',
              title: 'Test',
              url: 'https://example.com',
              actions: [],
            },
          },
        ],
      };

      const blob = new Blob([JSON.stringify(oldPackage)], {
        type: 'application/json',
      });
      mockRecordingStore.saveWithExecutions.mockResolvedValue(undefined);

      const result = await unpacker.unpack(blob);

      expect(result.success).toBe(true);
      expect(mockRecordingStore.saveWithExecutions).toHaveBeenCalledWith(
        expect.any(Object),
        []
      );
    });

    it('should normalize timestamps correctly', async () => {
      const unpacker = new RecordingUnpacker();
      const packageData = {
        version: PACKAGE_VERSION,
        exportedAt: Date.now(),
        recordings: [
          {
            recording: {
              id: 'test-1',
              title: 'Test',
              urlOriginal: 'https://example.com',
              url: 'https://example.com',
              timestamp: 1234567890, // Unix seconds
              startedAt: 1234567890,
              actions: [],
            },
            executionLogs: [],
          },
        ],
      };

      const blob = new Blob([JSON.stringify(packageData)], {
        type: 'application/json',
      });
      mockRecordingStore.saveWithExecutions.mockResolvedValue(undefined);

      await unpacker.unpack(blob);

      expect(mockRecordingStore.saveWithExecutions).toHaveBeenCalledWith(
        expect.objectContaining({
          timestamp: 1234567890000, // Converted to milliseconds
          startedAt: 1234567890000,
        }),
        []
      );
    });
  });

  describe('PackageRecorder Integration', () => {
    it('should export all recordings with executions', async () => {
      const packageRecorder = PackageRecorder.getInstance();
      const mockRecordings = [
        {
          recording: {
            id: 'test-1',
            title: 'Test 1',
            urlOriginal: 'https://example.com',
            url: 'https://example.com',
            hostname: 'example.com',
            startedAt: Date.now(),
            endedAt: Date.now() + 1000,
            actions: [],
            code: { cypress: '' },
          },
          executionLogs: [],
        },
      ];

      mockRecordingStore.getAllWithExecutions.mockResolvedValue(mockRecordings);

      const blob = await packageRecorder.exportAll();

      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('application/json');
      expect(mockRecordingStore.getAllWithExecutions).toHaveBeenCalled();
    });

    it('should generate correct filename', () => {
      const packageRecorder = PackageRecorder.getInstance();

      const filename1 = packageRecorder.getFileName();
      expect(filename1).toMatch(
        /^recordings_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}.*\.dpsnap$/
      );

      const filename2 = packageRecorder.getFileName('My Test Recording');
      expect(filename2).toMatch(
        /^my_test_recording_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}.*\.dpsnap$/
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle storage quota exceeded', async () => {
      const unpacker = new RecordingUnpacker();
      const packageData = {
        version: PACKAGE_VERSION,
        exportedAt: Date.now(),
        recordings: [
          {
            recording: {
              id: 'test-1',
              title: 'Test',
              urlOriginal: 'https://example.com',
              url: 'https://example.com',
              actions: [],
            },
            executionLogs: [],
          },
        ],
      };

      const blob = new Blob([JSON.stringify(packageData)], {
        type: 'application/json',
      });

      mockRecordingStore.saveWithExecutions.mockRejectedValue(
        new Error('Storage quota exceeded')
      );

      const result = await unpacker.unpack(blob);

      expect(result.success).toBe(false);
      expect(result.failed).toBe(1);
      expect(result.errors[0]).toContain('Storage quota exceeded');
    });

    it('should handle corrupted JSON', async () => {
      const unpacker = new RecordingUnpacker();
      const blob = new Blob(['invalid json'], { type: 'application/json' });

      const result = await unpacker.unpack(blob);

      expect(result.success).toBe(false);
      expect(result.errors[0]).toContain('Package parsing error');
    });
  });
});
