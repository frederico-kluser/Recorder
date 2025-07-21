/**
 * Testes para endRecording focados em garantir uso da URL inicial
 */

import { endRecording } from '../endRecording';
import { localStorageGet } from '../utils';
import { RecordingService } from '../../storage/recording-service';

// Mocks
jest.mock('../utils');
jest.mock('../../storage/recording-service');

const mockLocalStorageGet = localStorageGet as jest.MockedFunction<typeof localStorageGet>;
const mockChromeRuntime = {
  sendMessage: jest.fn()
} as unknown as typeof chrome.runtime;

const mockChromeTabs = {
  query: jest.fn()
} as unknown as typeof chrome.tabs;

// @ts-ignore
global.chrome = {
  runtime: mockChromeRuntime,
  tabs: mockChromeTabs
};

describe('endRecording - URL Original', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); // Silencia logs de erro nos testes
  });

  it('deve usar firstUrl ao salvar a gravação', async () => {
    const mockRecording = [
      { type: 'click', timestamp: 1000 },
      { type: 'input', timestamp: 2000 }
    ];

    mockLocalStorageGet.mockResolvedValue({
      recording: mockRecording,
      returnTabId: null,
      recordingStartTime: 1000,
      firstUrl: 'https://example.com/start'
    });

    await endRecording();

    expect(RecordingService.createRecording).toHaveBeenCalledWith(
      mockRecording,
      'https://example.com/start', // Deve usar firstUrl
      1000,
      expect.any(Number)
    );
  });

  it('não deve salvar gravação se firstUrl não estiver presente', async () => {
    const mockRecording = [
      { type: 'navigate', url: 'https://example.com/page', timestamp: 1000 },
      { type: 'click', timestamp: 2000 }
    ];

    mockLocalStorageGet.mockResolvedValue({
      recording: mockRecording,
      returnTabId: null,
      recordingStartTime: 1000,
      firstUrl: null // Sem firstUrl
    });

    await endRecording();

    expect(RecordingService.createRecording).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'URL inicial não encontrada. Gravação não será salva.'
    );
  });

  it('deve enviar código gerado para returnTabId se presente', async () => {
    const mockRecording = [
      { type: 'click', timestamp: 1000 }
    ];

    mockLocalStorageGet.mockResolvedValue({
      recording: mockRecording,
      returnTabId: 123,
      recordingStartTime: 1000,
      firstUrl: 'https://example.com/start'
    });

    await endRecording();

    expect(mockChromeRuntime.sendMessage).toHaveBeenCalledWith({
      type: 'forward-recording',
      tabId: 123,
      code: expect.any(String),
      actions: mockRecording
    });
  });

  it('não deve enviar mensagem se returnTabId for null', async () => {
    const mockRecording = [
      { type: 'click', timestamp: 1000 }
    ];

    mockLocalStorageGet.mockResolvedValue({
      recording: mockRecording,
      returnTabId: null,
      recordingStartTime: 1000,
      firstUrl: 'https://example.com/start'
    });

    await endRecording();

    expect(mockChromeRuntime.sendMessage).not.toHaveBeenCalled();
  });

  it('deve tratar erros ao salvar graciosamente', async () => {
    const mockRecording = [
      { type: 'click', timestamp: 1000 }
    ];

    mockLocalStorageGet.mockResolvedValue({
      recording: mockRecording,
      returnTabId: null,
      recordingStartTime: 1000,
      firstUrl: 'https://example.com/start'
    });

    const mockError = new Error('Storage error');
    (RecordingService.createRecording as jest.Mock).mockRejectedValue(mockError);

    await endRecording();

    expect(console.error).toHaveBeenCalledWith(
      'Erro ao salvar gravação no histórico:',
      mockError
    );
  });
});