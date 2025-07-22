/**
 * @jest-environment jsdom
 */

import React from 'react';
// @ts-ignore
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// @ts-ignore
import { renderHook } from '@testing-library/react-hooks';
import { ExecutionLog } from '../../../../replay/types/session';
import '@testing-library/jest-dom';
import { ExecutionHistory, useExecutionLogs } from '../ExecutionHistory';
import { recordingStore } from '../../../storage/recording-store';
import { ActionType } from '../../../types';

// Mock the recording store
jest.mock('../../../storage/recording-store', () => ({
  recordingStore: {
    get: jest.fn(),
    updateExecutionLogs: jest.fn(),
  },
}));

// Mock chrome storage API
const mockStorageListener = jest.fn();
global.chrome = {
  storage: {
    onChanged: {
      addListener: mockStorageListener,
      removeListener: jest.fn(),
    },
    local: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
  runtime: {
    lastError: null,
  },
} as any;

// Define mock data at module level to be accessible in all describe blocks
const mockRecordingId = 'test-recording-123';
const mockExecutionLogs = [
  {
    ts: 1234567890000,
    action: {
      type: ActionType.Click,
      timestamp: 1234567890000,
      selectors: { generalSelector: 'button.submit' },
      tagName: 'BUTTON' as any,
      inputType: undefined,
      value: undefined,
      clickX: 100,
      clickY: 200,
    },
    screenshot: 'data:image/png;base64,screenshot1',
  },
  {
    ts: 1234567891000,
    action: {
      type: ActionType.Input,
      timestamp: 1234567891000,
      selectors: { generalSelector: 'input[name="email"]' },
      tagName: 'INPUT' as any,
      inputType: 'email',
      value: 'test@example.com',
    },
    screenshot: 'data:image/png;base64,screenshot2',
  },
];

describe('ExecutionHistory', () => {
  const mockExecutionLogsLocal = [
    {
      ts: 1234567890000,
      action: {
        type: ActionType.Click,
        timestamp: 1234567890000,
        selectors: { generalSelector: 'button.submit' },
        tagName: 'BUTTON' as any,
        inputType: undefined,
        value: undefined,
        isPassword: false,
        hasOnlyText: false,
      },
      screenshot: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
    },
    {
      ts: 1234567891000,
      action: {
        type: ActionType.Input,
        timestamp: 1234567891000,
        selectors: { generalSelector: 'input#email' },
        tagName: 'INPUT' as any,
        inputType: 'email' as any,
        value: 'test@example.com',
        isPassword: false,
        hasOnlyText: false,
      },
      screenshot: 'error:permission_denied',
    },
    {
      ts: 1234567892000,
      action: {
        type: ActionType.Navigate,
        url: 'https://example.com',
        timestamp: 1234567892000,
        selectors: {},
        tagName: 'A' as any,
        inputType: undefined,
        value: undefined,
        isPassword: false,
        hasOnlyText: false,
      },
      screenshot: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (recordingStore.get as jest.Mock).mockResolvedValue({
      id: mockRecordingId,
      executionLogs: mockExecutionLogs,
    });
  });

  describe('Component Rendering', () => {
    it('should render empty state when no execution logs', async () => {
      (recordingStore.get as jest.Mock).mockResolvedValue({
        id: mockRecordingId,
        executionLogs: [],
      });

      render(<ExecutionHistory recordingId={mockRecordingId} />);

      expect(
        screen.getByText('No execution logs available yet.')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Run a replay to see the execution history with screenshots.'
        )
      ).toBeInTheDocument();
    });

    it('should render execution logs list', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        expect(
          screen.getByText('Execution History (3 actions)')
        ).toBeInTheDocument();
      });

      // Check if logs are rendered
      expect(screen.getByText(/Click on button.submit/)).toBeInTheDocument();
      expect(
        screen.getByText(/Input "test@example.com" on input#email/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Navigate to https:\/\/example.com/)
      ).toBeInTheDocument();
    });

    it('should display timestamps correctly', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        // Timestamps should be formatted
        const timestamps = screen.getAllByText(/\d{2}:\d{2}:\d{2}\.\d{3}/);
        expect(timestamps.length).toBeGreaterThan(0);
      });
    });

    it('should display screenshot error states', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        // Should show error message for failed screenshot
        expect(
          screen.getByText('Screenshot failed: permission_denied')
        ).toBeInTheDocument();
        // Should show no screenshot message
        expect(screen.getByText('No screenshot')).toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    it('should open lightbox when clicking on valid screenshot', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        const firstLogItem = document.querySelectorAll(
          '.execution-log-item'
        )[0];
        fireEvent.click(firstLogItem);
      });

      expect(
        document.querySelector('.screenshot-lightbox')
      ).toBeInTheDocument();
    });

    it('should not open lightbox for error screenshots', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        const secondLogItem = document.querySelectorAll(
          '.execution-log-item'
        )[1];
        fireEvent.click(secondLogItem);
      });

      expect(
        document.querySelector('.screenshot-lightbox')
      ).not.toBeInTheDocument();
    });

    it('should close lightbox when clicking close button', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        const firstLogItem = document.querySelectorAll(
          '.execution-log-item'
        )[0];
        fireEvent.click(firstLogItem);
      });

      const closeButton = document.querySelector('.lightbox-close');
      fireEvent.click(closeButton!);

      expect(
        document.querySelector('.screenshot-lightbox')
      ).not.toBeInTheDocument();
    });

    it('should close lightbox when clicking outside', async () => {
      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        const firstLogItem = document.querySelectorAll(
          '.execution-log-item'
        )[0];
        fireEvent.click(firstLogItem);
      });

      const lightbox = document.querySelector('.screenshot-lightbox');
      if (lightbox) {
        fireEvent.click(lightbox);
      }

      expect(
        document.querySelector('.screenshot-lightbox')
      ).not.toBeInTheDocument();
    });
  });

  describe('Virtual Scrolling', () => {
    it('should handle scroll events', async () => {
      // Create many logs to test virtual scrolling
      const manyLogs = Array.from({ length: 100 }, (_, i) => ({
        ts: 1234567890000 + i * 1000,
        action: {
          type: ActionType.Click,
          timestamp: 1234567890000 + i * 1000,
          selectors: { generalSelector: `button-${i}` },
          tagName: 'BUTTON' as any,
          inputType: undefined,
          value: undefined,
          isPassword: false,
          hasOnlyText: false,
        },
        screenshot: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
      }));

      (recordingStore.get as jest.Mock).mockResolvedValue({
        id: mockRecordingId,
        executionLogs: manyLogs,
      });

      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        expect(
          screen.getByText('Execution History (100 actions)')
        ).toBeInTheDocument();
      });

      const scrollContainer = document.querySelector('.execution-logs-list');

      // Simulate scroll
      if (scrollContainer) {
        fireEvent.scroll(scrollContainer, { target: { scrollTop: 800 } });
      }

      // Virtual scrolling should render a limited number of items
      const visibleItems = document.querySelectorAll('.execution-log-item');
      expect(visibleItems.length).toBeLessThan(100);
    });
  });

  describe('Action Descriptions', () => {
    it('should format different action types correctly', async () => {
      const diverseActions = [
        {
          ts: Date.now(),
          action: {
            type: ActionType.Wheel,
            x: 0,
            y: 500,
            timestamp: Date.now(),
            selectors: {},
            tagName: 'BODY' as any,
            isPassword: false,
            hasOnlyText: false,
          },
          screenshot: '',
        },
        {
          ts: Date.now(),
          action: {
            type: ActionType.Resize,
            width: 1920,
            height: 1080,
            timestamp: Date.now(),
            selectors: {},
            tagName: 'BODY' as any,
            isPassword: false,
            hasOnlyText: false,
          },
          screenshot: '',
        },
        {
          ts: Date.now(),
          action: {
            type: ActionType.Wheel,
            deltaX: 0,
            deltaY: 100,
            timestamp: Date.now(),
            selectors: {},
            tagName: 'BODY' as any,
            isPassword: false,
            hasOnlyText: false,
          },
          screenshot: '',
        },
      ];

      (recordingStore.get as jest.Mock).mockResolvedValue({
        id: mockRecordingId,
        executionLogs: diverseActions,
      });

      render(<ExecutionHistory recordingId={mockRecordingId} />);

      await waitFor(() => {
        expect(screen.getByText(/Scroll to \(0, 500\)/)).toBeInTheDocument();
        expect(
          screen.getByText(/Resize window to 1920x1080/)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Wheel event: deltaX=0, deltaY=100/)
        ).toBeInTheDocument();
      });
    });
  });
});

describe('useExecutionLogs hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (recordingStore.get as jest.Mock).mockResolvedValue({
      id: mockRecordingId,
      executionLogs: mockExecutionLogs,
    });
  });

  it('should load execution logs on mount', async () => {
    const { result } = renderHook(() => useExecutionLogs(mockRecordingId));

    // Initially should be empty
    expect((result as any).current).toEqual([]);

    await waitFor(() => {
      expect((result as any).current).toEqual(mockExecutionLogs);
    });
  });

  it('should update logs when storage changes', async () => {
    const { result } = renderHook(() => useExecutionLogs(mockRecordingId));

    await waitFor(() => {
      expect((result as any).current).toEqual(mockExecutionLogs);
    });

    // Simulate storage change
    const newLogs = [
      ...mockExecutionLogs,
      { ts: Date.now(), action: {} as any, screenshot: '' },
    ];

    // Update the mock to return new logs
    (recordingStore.get as jest.Mock).mockResolvedValue({
      id: mockRecordingId,
      executionLogs: newLogs,
    });

    // Get the storage change callback that was registered
    const changeCallback = mockStorageListener.mock.calls[0][0];
    changeCallback({
      recordingHistory: {
        newValue: {},
      },
    });

    await waitFor(() => {
      expect((result as any).current).toEqual(newLogs);
    });
  });

  it('should cleanup listener on unmount', () => {
    const { unmount } = renderHook(() => useExecutionLogs(mockRecordingId));

    expect(mockStorageListener).toHaveBeenCalled();

    unmount();

    expect(chrome.storage.onChanged.removeListener).toHaveBeenCalled();
  });
});

// Helper function to render hooks
function renderHook<T>(hook: () => T) {
  let result: T;

  function TestComponent() {
    result = hook();
    return null;
  }

  const utils = render(<TestComponent />);

  return {
    result: result!,
    ...utils,
  };
}
