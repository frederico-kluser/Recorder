/**
 * Testes para o RecordingStore com foco na migração de URLs
 */

import { RecordingStore } from '../recording-store';
import { RecordingEntry } from '../../types/recording';
import { ExecutionLog } from '../../../replay/types/session';
import { ActionType } from '../../types';

// Mock do chrome.storage.local
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockRemove = jest.fn();

const mockChromeStorage = {
  local: {
    get: mockGet,
    set: mockSet,
    remove: mockRemove,
  },
} as unknown as typeof chrome.storage;

// @ts-ignore
global.chrome = {
  storage: mockChromeStorage,
};

describe('RecordingStore - Migração de URLs', () => {
  let store: RecordingStore;

  beforeEach(() => {
    jest.clearAllMocks();
    store = RecordingStore.getInstance();
  });

  describe('migrateToUrlOriginal', () => {
    it('deve migrar gravações sem urlOriginal usando firstUrl', async () => {
      const mockRecordings = {
        test1: {
          id: 'test1',
          title: 'Test 1',
          url: 'https://example.com/final',
          firstUrl: 'https://example.com/start',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          test1: {
            ...mockRecordings.test1,
            urlOriginal: 'https://example.com/start',
          },
        },
      });
    });

    it('deve migrar gravações sem urlOriginal usando url como fallback', async () => {
      const mockRecordings = {
        test2: {
          id: 'test2',
          title: 'Test 2',
          url: 'https://example.com/page',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          test2: {
            ...mockRecordings.test2,
            urlOriginal: 'https://example.com/page',
          },
        },
      });
    });

    it('deve usar "unknown" se não houver URLs disponíveis', async () => {
      const mockRecordings = {
        test3: {
          id: 'test3',
          title: 'Test 3',
          hostname: 'localhost',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          test3: {
            ...mockRecordings.test3,
            urlOriginal: 'unknown',
          },
        },
      });
    });

    it('não deve migrar gravações que já possuem urlOriginal', async () => {
      const mockRecordings = {
        test4: {
          id: 'test4',
          title: 'Test 4',
          urlOriginal: 'https://example.com/original',
          url: 'https://example.com/final',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).not.toHaveBeenCalled();
    });
  });

  describe('save', () => {
    it('deve salvar gravação com urlOriginal', async () => {
      const newRecording: RecordingEntry = {
        id: 'new1',
        title: 'New Recording',
        urlOriginal: 'https://example.com/start',
        url: 'https://example.com/start',
        hostname: 'example.com',
        startedAt: 1000,
        endedAt: 2000,
        actions: [],
        code: { cypress: '' },
      };

      mockGet.mockResolvedValue({
        recordingHistory: {},
      });

      await store.save(newRecording);

      // Aguarda o debounce
      await new Promise((resolve) => setTimeout(resolve, 300));

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          recordingHistory: expect.objectContaining({
            new1: expect.objectContaining({
              urlOriginal: 'https://example.com/start',
            }),
          }),
        })
      );
    });
  });

  describe('updateExecutionLogs', () => {
    const mockExecutionLogs: ExecutionLog[] = [
      {
        ts: Date.now(),
        action: {
          type: ActionType.Click,
          timestamp: Date.now(),
          selectors: {},
          tagName: 'BUTTON' as any,
          inputType: undefined,
          value: undefined,
          isPassword: false,
          hasOnlyText: false,
          selector: 'button',
        },
        screenshot: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
      },
    ];

    beforeEach(() => {
      // Mock getBytesInUse
      (chrome.storage.local as any).getBytesInUse = jest
        .fn()
        .mockResolvedValue(1000);
      // Reset debounce timer
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('deve atualizar os logs de execução de uma gravação', async () => {
      const mockRecording = {
        id: 'test-recording',
        title: 'Test Recording',
        urlOriginal: 'https://example.com',
        hostname: 'example.com',
        startedAt: 1000,
        endedAt: 2000,
        actions: [],
        code: { cypress: '' },
      };

      mockGet.mockResolvedValue({
        recordingHistory: {
          'test-recording': mockRecording,
        },
      });

      await store.updateExecutionLogs('test-recording', mockExecutionLogs);

      // Advance timers to trigger debounced update
      jest.advanceTimersByTime(250);

      // Wait for async operations
      await Promise.resolve();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          'test-recording': {
            ...mockRecording,
            executionLogs: mockExecutionLogs,
          },
        },
      });
    });

    it('deve aplicar pruning quando o limite de armazenamento é excedido', async () => {
      // Mock storage quota exceeded
      (chrome.storage.local as any).getBytesInUse = jest
        .fn()
        .mockResolvedValue(6 * 1024 * 1024);

      const oldRecordings: Record<string, any> = {};
      // Create 15 recordings with execution logs
      for (let i = 0; i < 15; i++) {
        oldRecordings[`recording-${i}`] = {
          id: `recording-${i}`,
          title: `Recording ${i}`,
          urlOriginal: 'https://example.com',
          hostname: 'example.com',
          startedAt: 1000 + i * 1000,
          endedAt: 2000 + i * 1000,
          actions: [],
          code: { cypress: '' },
          executionLogs: [
            {
              ts: Date.now(),
              action: {
                type: ActionType.Click,
                timestamp: Date.now(),
                selectors: {},
                tagName: 'BUTTON' as any,
                inputType: undefined,
                value: undefined,
                isPassword: false,
                hasOnlyText: false,
              },
              screenshot: 'data:image/jpeg;base64,large_screenshot_data...',
            },
          ],
        };
      }

      mockGet.mockResolvedValue({
        recordingHistory: oldRecordings,
      });

      await store.updateExecutionLogs('recording-14', mockExecutionLogs);

      // Advance timers
      jest.advanceTimersByTime(250);
      await Promise.resolve();

      const setCallArgs = mockSet.mock.calls[0][0];
      const updatedRecordings = setCallArgs.recordingHistory;

      // Check that old recordings have pruned screenshots
      for (let i = 0; i < 5; i++) {
        expect(
          updatedRecordings[`recording-${i}`].executionLogs[0].screenshot
        ).toBe('error:pruned_for_storage');
      }

      // Check that recent recordings keep their screenshots
      for (let i = 5; i < 15; i++) {
        if (i === 14) {
          // The updated recording
          expect(updatedRecordings[`recording-${i}`].executionLogs).toEqual(
            mockExecutionLogs
          );
        } else {
          expect(
            updatedRecordings[`recording-${i}`].executionLogs[0].screenshot
          ).not.toBe('error:pruned_for_storage');
        }
      }
    });

    it('deve debounce múltiplas chamadas de updateExecutionLogs', async () => {
      const mockRecording = {
        id: 'test-recording',
        title: 'Test Recording',
        urlOriginal: 'https://example.com',
        hostname: 'example.com',
        startedAt: 1000,
        endedAt: 2000,
        actions: [],
        code: { cypress: '' },
      };

      mockGet.mockResolvedValue({
        recordingHistory: {
          'test-recording': mockRecording,
        },
      });

      // Call updateExecutionLogs multiple times rapidly
      await store.updateExecutionLogs('test-recording', mockExecutionLogs);
      await store.updateExecutionLogs('test-recording', [
        ...mockExecutionLogs,
        mockExecutionLogs[0],
      ]);
      await store.updateExecutionLogs('test-recording', [
        ...mockExecutionLogs,
        mockExecutionLogs[0],
        mockExecutionLogs[0],
      ]);

      // Should not have called set yet
      expect(mockSet).not.toHaveBeenCalled();

      // Advance timers
      jest.advanceTimersByTime(250);
      await Promise.resolve();

      // Should have been called only once with the last value
      expect(mockSet).toHaveBeenCalledTimes(1);
      expect(
        mockSet.mock.calls[0][0].recordingHistory['test-recording']
          .executionLogs
      ).toHaveLength(3);
    });
  });

  describe('migrateExecutionLogs', () => {
    it('deve adicionar executionLogs vazio para gravações antigas', async () => {
      const mockRecordings = {
        'old-recording': {
          id: 'old-recording',
          title: 'Old Recording',
          urlOriginal: 'https://example.com',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
          // No executionLogs field
        },
        'new-recording': {
          id: 'new-recording',
          title: 'New Recording',
          urlOriginal: 'https://example.com',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
          executionLogs: [], // Already has executionLogs
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateExecutionLogs();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          'old-recording': {
            ...mockRecordings['old-recording'],
            executionLogs: [],
          },
          'new-recording': mockRecordings['new-recording'],
        },
      });
    });

    it('não deve fazer nada se todas as gravações já têm executionLogs', async () => {
      const mockRecordings = {
        'recording-1': {
          id: 'recording-1',
          title: 'Recording 1',
          urlOriginal: 'https://example.com',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' },
          executionLogs: [],
        },
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings,
      });

      await store.migrateExecutionLogs();

      expect(mockSet).not.toHaveBeenCalled();
    });
  });
});
