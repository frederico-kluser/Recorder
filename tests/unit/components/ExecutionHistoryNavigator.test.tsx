import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExecutionHistoryNavigator } from '../../../src/pages/Popup/components/ExecutionHistoryNavigator';
import { recordingStore } from '../../../src/pages/storage/recording-store';
import {
  ExecutionMeta,
  ExecutionLog,
} from '../../../src/pages/types/execution';

// Mock das dependências
jest.mock('../../../src/pages/storage/recording-store');
jest.mock('../../../src/pages/Popup/hooks/useExecutionNav', () => ({
  useExecutionNav: () => ({
    selectedExecutionId: null,
    isLoading: false,
    navigateToExecution: jest.fn(),
    navigateBack: jest.fn(),
    setLoading: jest.fn(),
  }),
}));

describe('ExecutionHistoryNavigator', () => {
  const mockExecutions: ExecutionMeta[] = [
    {
      id: 'exec-0-1700000000',
      startedAt: 1700000000000,
      endedAt: 1700000060000,
      stepCount: 5,
      hasErrors: false,
      url: 'https://example.com',
      title: 'Test Recording',
    },
  ];

  const mockExecutionLog: ExecutionLog = {
    id: 'exec-0-1700000000',
    meta: mockExecutions[0],
    steps: [
      {
        action: 'click',
        timestamp: 1700000010000,
        selector: 'button.submit',
        screenshot: 'data:image/png;base64,test',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (recordingStore.listExecutions as jest.Mock).mockResolvedValue(
      mockExecutions
    );
    (recordingStore.getExecution as jest.Mock).mockResolvedValue(
      mockExecutionLog
    );
  });

  it('should load and display executions list', async () => {
    render(<ExecutionHistoryNavigator recordingId="test-recording-123" />);

    await waitFor(() => {
      expect(screen.getByText('Histórico de Execuções')).toBeInTheDocument();
    });

    expect(recordingStore.listExecutions).toHaveBeenCalledWith(
      'test-recording-123'
    );
  });

  it('should show error state when loading fails', async () => {
    (recordingStore.listExecutions as jest.Mock).mockRejectedValue(
      new Error('Load failed')
    );

    render(<ExecutionHistoryNavigator recordingId="test-recording-123" />);

    await waitFor(() => {
      expect(
        screen.getByText('Falha ao carregar execuções')
      ).toBeInTheDocument();
    });
  });

  it('should render ExecutionTable when no execution is selected', async () => {
    render(<ExecutionHistoryNavigator recordingId="test-recording-123" />);

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
