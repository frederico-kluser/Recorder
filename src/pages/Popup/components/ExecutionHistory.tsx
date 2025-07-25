/**
 * ExecutionHistory Component
 * Displays a virtualized list of execution logs with screenshot thumbnails
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ExecutionLog } from '../../../replay/types/session';
import { recordingStore } from '../../storage/recording-store';
import { RecordingEntry } from '../../types/recording';
import { ActionType } from '../../types';
import ExecutionThumbnail from './ExecutionThumbnail';
import './execution-history.css';

interface ExecutionHistoryProps {
  recordingId?: string;
  executionLog?: ExecutionLog;
}

// Hook to access execution logs from RecordingStore
export function useExecutionLogs(recordingId: string): ExecutionLog[] {
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  useEffect(() => {
    if (!recordingId) {
      setExecutionLogs([]);
      return;
    }

    const loadExecutionLogs = async () => {
      try {
        const recording = await recordingStore.get(recordingId);
        if (recording?.executionLogs) {
          setExecutionLogs(recording.executionLogs);
        }
      } catch (error) {
        console.error('Error loading execution logs:', error);
      }
    };

    loadExecutionLogs();

    // Listen for storage changes
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.recordingHistory) {
        loadExecutionLogs();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [recordingId]);

  return executionLogs;
}

export const ExecutionHistory: React.FC<ExecutionHistoryProps> = ({
  recordingId,
  executionLog,
}) => {
  const executionLogsFromStore = useExecutionLogs(recordingId || '');
  const executionLogs = executionLog ? [executionLog] : executionLogsFromStore;
  const [selectedLog, setSelectedLog] = useState<ExecutionLog | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);

  // Virtual scrolling state
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  const itemHeight = 100; // Height of each log item

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(start + 20, executionLogs.length);
    setVisibleRange({ start, end });
  };

  const visibleLogs = useMemo(() => {
    return executionLogs.slice(visibleRange.start, visibleRange.end);
  }, [executionLogs, visibleRange]);

  const handleLogClick = (log: ExecutionLog) => {
    if (log.screenshot && !log.screenshot.startsWith('error:')) {
      setSelectedLog(log);
      setShowLightbox(true);
    }
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedLog(null);
  };

  const formatTimestamp = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    });
  };

  const getActionDescription = (
    log: ExecutionLog
  ): { icon: string; text: string } => {
    const action = log.action;
    switch (action.type) {
      case ActionType.Click:
        const clickText =
          action.selectors?.text ||
          action.selectors?.generalSelector ||
          'element';
        return {
          icon: '👆',
          text: `Click on "${
            clickText.length > 50
              ? clickText.substring(0, 50) + '...'
              : clickText
          }"`,
        };
      case ActionType.Input:
        return {
          icon: '⌨️',
          text: `Type "${action.value || ''}" in ${
            action.selectors?.generalSelector || 'input'
          }`,
        };
      case ActionType.Navigate:
        return { icon: '🔗', text: `Navigate to ${(action as any).url}` };
      case ActionType.Load:
        return { icon: '📄', text: `Load ${(action as any).url}` };
      case ActionType.Resize:
        return {
          icon: '📐',
          text: `Resize window to ${(action as any).width}x${
            (action as any).height
          }`,
        };
      case ActionType.Wheel:
        return {
          icon: '🖱️',
          text: `Scroll ${
            (action as any).deltaY > 0 ? 'down' : 'up'
          } by ${Math.abs((action as any).deltaY)}px`,
        };
      case ActionType.FullScreenshot:
        return { icon: '📸', text: 'Take screenshot' };
      default:
        return { icon: '❓', text: `${action.type} action` };
    }
  };

  const getScreenshotStatus = (
    screenshot: string
  ): { isError: boolean; message: string } => {
    if (screenshot.startsWith('error:')) {
      const errorType = screenshot.substring(6);
      switch (errorType) {
        case 'permission_denied':
          return { isError: true, message: 'Permission denied' };
        case 'tab_not_focused':
          return { isError: true, message: 'Tab not focused' };
        case 'invalid_tab':
          return { isError: true, message: 'Invalid tab' };
        case 'pruned_for_storage':
          return { isError: true, message: 'Removed to save space' };
        default:
          return { isError: true, message: errorType };
      }
    }
    return { isError: false, message: '' };
  };

  if (executionLogs.length === 0) {
    return (
      <div className="execution-history-empty">
        <p>No execution logs available yet.</p>
        <p>Run a replay to see the execution history with screenshots.</p>
      </div>
    );
  }

  return (
    <div className="execution-history-container">
      <h3>Execution History ({executionLogs.length} actions)</h3>

      <div
        className="execution-logs-list"
        onScroll={handleScroll}
        style={{ height: '400px', overflowY: 'auto' }}
      >
        {/* Virtual scroll spacer */}
        <div style={{ height: `${visibleRange.start * itemHeight}px` }} />

        {visibleLogs.map((log, index) => {
          const actualIndex = visibleRange.start + index;
          const screenshotStatus = getScreenshotStatus(log.screenshot);
          const actionInfo = getActionDescription(log);

          return (
            <div
              key={actualIndex}
              className="execution-log-item"
              onClick={() => handleLogClick(log)}
              style={{ height: `${itemHeight}px` }}
            >
              <div className="log-index">#{actualIndex + 1}</div>

              <div className="log-thumbnail">
                <ExecutionThumbnail
                  src={!screenshotStatus.isError ? log.screenshot : undefined}
                  alt={`Screenshot ${actualIndex + 1}`}
                  onClick={() => handleLogClick(log)}
                  className="execution-log-item"
                />
              </div>

              <div className="log-details">
                <div className="log-header">
                  <span className="log-icon">{actionInfo.icon}</span>
                  <div className="log-type">{log.action.type}</div>
                </div>
                <div className="log-action" title={actionInfo.text}>
                  {actionInfo.text}
                </div>
                <div className="log-timestamp">{formatTimestamp(log.ts)}</div>
              </div>
            </div>
          );
        })}

        {/* Virtual scroll spacer */}
        <div
          style={{
            height: `${
              (executionLogs.length - visibleRange.end) * itemHeight
            }px`,
          }}
        />
      </div>

      {/* Lightbox for full screenshot view */}
      {showLightbox &&
        selectedLog &&
        !selectedLog.screenshot.startsWith('error:') && (
          <div className="screenshot-lightbox" onClick={closeLightbox}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                ×
              </button>
              <img src={selectedLog.screenshot} alt="Full screenshot" />
              <div className="lightbox-info">
                <p>{formatTimestamp(selectedLog.ts)}</p>
                <p>{getActionDescription(selectedLog).text}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};
