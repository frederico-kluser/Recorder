/**
 * Testes para ReplayHandler focados no uso da URL original
 */

import { replayHandler } from '../replay-handler';
import { recordingStore } from '../../../pages/storage/recording-store';
import { ReplayRequest, ReplayMode } from '../../../types/replay';
import { RecordingEntry } from '../../../pages/types/recording';
import { ActionType } from '../../../pages/types/index';

// Mocks
jest.mock('../../../pages/storage/recording-store');

const mockChrome = {
  tabs: {
    create: jest.fn(),
    onUpdated: {
      addListener: jest.fn(),
      removeListener: jest.fn()
    },
    onRemoved: {
      addListener: jest.fn()
    },
    sendMessage: jest.fn()
  },
  scripting: {
    executeScript: jest.fn()
  },
  runtime: {
    onMessage: {
      addListener: jest.fn()
    },
    sendMessage: jest.fn()
  }
};

// @ts-ignore
global.chrome = mockChrome;

describe('ReplayHandler - URL Original', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve usar urlOriginal ao criar nova aba para replay', async () => {
    const mockRecording: RecordingEntry = {
      id: 'test1',
      title: 'Test Recording',
      urlOriginal: 'https://example.com/start',
      url: 'https://example.com/final',
      hostname: 'example.com',
      startedAt: 1000,
      endedAt: 2000,
      actions: [{ type: ActionType.Click, timestamp: 1000 } as any],
      code: { cypress: '' }
    };

    (recordingStore.get as jest.Mock).mockResolvedValue(mockRecording);
    mockChrome.tabs.create.mockResolvedValue({ id: 456 });

    const request: ReplayRequest = {
      type: 'REPLAY_REQUEST',
      recordingId: 'test1',
      mode: ReplayMode.KEEP_CACHE
    };

    const sendResponse = jest.fn();

    // Simula chamada do handler
    const handler = replayHandler as any;
    await handler.handleReplayRequest(request, sendResponse);

    expect(mockChrome.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/start', // Deve usar urlOriginal
      active: true
    });
  });

  it('deve usar firstUrl como fallback se urlOriginal não existir', async () => {
    const mockRecording: RecordingEntry = {
      id: 'test2',
      title: 'Test Recording',
      firstUrl: 'https://example.com/first',
      url: 'https://example.com/final',
      hostname: 'example.com',
      startedAt: 1000,
      endedAt: 2000,
      actions: [{ type: ActionType.Click, timestamp: 1000 } as any],
      code: { cypress: '' }
    } as RecordingEntry;

    (recordingStore.get as jest.Mock).mockResolvedValue(mockRecording);
    mockChrome.tabs.create.mockResolvedValue({ id: 456 });

    const request: ReplayRequest = {
      type: 'REPLAY_REQUEST',
      recordingId: 'test2',
      mode: ReplayMode.KEEP_CACHE
    };

    const sendResponse = jest.fn();

    const handler = replayHandler as any;
    await handler.handleReplayRequest(request, sendResponse);

    expect(mockChrome.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/first',
      active: true
    });
  });

  it('deve usar url como último fallback', async () => {
    const mockRecording: RecordingEntry = {
      id: 'test3',
      title: 'Test Recording',
      url: 'https://example.com/only',
      hostname: 'example.com',
      startedAt: 1000,
      endedAt: 2000,
      actions: [{ type: ActionType.Click, timestamp: 1000 } as any],
      code: { cypress: '' }
    } as RecordingEntry;

    (recordingStore.get as jest.Mock).mockResolvedValue(mockRecording);
    mockChrome.tabs.create.mockResolvedValue({ id: 456 });

    const request: ReplayRequest = {
      type: 'REPLAY_REQUEST',
      recordingId: 'test3',
      mode: ReplayMode.KEEP_CACHE
    };

    const sendResponse = jest.fn();

    const handler = replayHandler as any;
    await handler.handleReplayRequest(request, sendResponse);

    expect(mockChrome.tabs.create).toHaveBeenCalledWith({
      url: 'https://example.com/only',
      active: true
    });
  });

  it('deve usar "/" como fallback final se nenhuma URL estiver disponível', async () => {
    const mockRecording: RecordingEntry = {
      id: 'test4',
      title: 'Test Recording',
      hostname: 'localhost',
      startedAt: 1000,
      endedAt: 2000,
      actions: [{ type: ActionType.Click, timestamp: 1000 } as any],
      code: { cypress: '' }
    } as RecordingEntry;

    (recordingStore.get as jest.Mock).mockResolvedValue(mockRecording);
    mockChrome.tabs.create.mockResolvedValue({ id: 456 });

    const request: ReplayRequest = {
      type: 'REPLAY_REQUEST',
      recordingId: 'test4',
      mode: ReplayMode.KEEP_CACHE
    };

    const sendResponse = jest.fn();

    const handler = replayHandler as any;
    await handler.handleReplayRequest(request, sendResponse);

    expect(mockChrome.tabs.create).toHaveBeenCalledWith({
      url: '/',
      active: true
    });
  });
});