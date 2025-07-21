/**
 * Testes para o RecordingStore com foco na migração de URLs
 */

import { RecordingStore } from '../recording-store';
import { RecordingEntry } from '../../types/recording';

// Mock do chrome.storage.local
const mockGet = jest.fn();
const mockSet = jest.fn();
const mockRemove = jest.fn();

const mockChromeStorage = {
  local: {
    get: mockGet,
    set: mockSet,
    remove: mockRemove
  }
} as unknown as typeof chrome.storage;

// @ts-ignore
global.chrome = {
  storage: mockChromeStorage
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
        'test1': {
          id: 'test1',
          title: 'Test 1',
          url: 'https://example.com/final',
          firstUrl: 'https://example.com/start',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' }
        }
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          'test1': {
            ...mockRecordings.test1,
            urlOriginal: 'https://example.com/start'
          }
        }
      });
    });

    it('deve migrar gravações sem urlOriginal usando url como fallback', async () => {
      const mockRecordings = {
        'test2': {
          id: 'test2',
          title: 'Test 2',
          url: 'https://example.com/page',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' }
        }
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          'test2': {
            ...mockRecordings.test2,
            urlOriginal: 'https://example.com/page'
          }
        }
      });
    });

    it('deve usar "unknown" se não houver URLs disponíveis', async () => {
      const mockRecordings = {
        'test3': {
          id: 'test3',
          title: 'Test 3',
          hostname: 'localhost',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' }
        }
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings
      });

      await store.migrateToUrlOriginal();

      expect(mockSet).toHaveBeenCalledWith({
        recordingHistory: {
          'test3': {
            ...mockRecordings.test3,
            urlOriginal: 'unknown'
          }
        }
      });
    });

    it('não deve migrar gravações que já possuem urlOriginal', async () => {
      const mockRecordings = {
        'test4': {
          id: 'test4',
          title: 'Test 4',
          urlOriginal: 'https://example.com/original',
          url: 'https://example.com/final',
          hostname: 'example.com',
          startedAt: 1000,
          endedAt: 2000,
          actions: [],
          code: { cypress: '' }
        }
      };

      mockGet.mockResolvedValue({
        recordingHistory: mockRecordings
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
        code: { cypress: '' }
      };

      mockGet.mockResolvedValue({
        recordingHistory: {}
      });

      await store.save(newRecording);

      // Aguarda o debounce
      await new Promise(resolve => setTimeout(resolve, 300));

      expect(mockSet).toHaveBeenCalledWith(
        expect.objectContaining({
          recordingHistory: expect.objectContaining({
            'new1': expect.objectContaining({
              urlOriginal: 'https://example.com/start'
            })
          })
        })
      );
    });
  });
});