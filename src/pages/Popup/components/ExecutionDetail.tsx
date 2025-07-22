import React, { useState, useMemo } from 'react';
import { ExecutionLog } from '../../../replay/types/session';
import { ActionType } from '../../types';
import { useExecutionConfig } from '../../../config/ui';
import ExecutionThumbnail from './ExecutionThumbnail';
import './execution-detail.css';

interface ExecutionDetailProps {
  executionLogs: ExecutionLog[];
}

export const ExecutionDetail: React.FC<ExecutionDetailProps> = ({
  executionLogs,
}) => {
  const [selectedLog, setSelectedLog] = useState<ExecutionLog | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const config = useExecutionConfig();

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

  const handleThumbnailClick = (
    e: React.MouseEvent | null,
    log: ExecutionLog
  ) => {
    if (e) e.stopPropagation();
    if (log.screenshot && !log.screenshot.startsWith('error:')) {
      // Cria um HTML com a imagem para abrir em nova aba
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Screenshot</title>
            <style>
              body {
                margin: 0;
                background: #000;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
              }
              img {
                max-width: 100%;
                max-height: 100vh;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${log.screenshot}" alt="Screenshot">
          </body>
        </html>
      `;
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, '_blank');

      // Limpa a URL após um pequeno delay
      setTimeout(() => URL.revokeObjectURL(url), 100);
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
      <div className="execution-detail-empty">
        <p>Nenhum log de execução disponível.</p>
      </div>
    );
  }

  return (
    <div className="execution-detail-container">
      <div className="execution-summary">
        <span className="summary-item">
          <strong>Total de ações:</strong> {executionLogs.length}
        </span>
      </div>

      <div
        className="execution-logs-list"
        onScroll={handleScroll}
        style={{ height: '400px', overflowY: 'auto', paddingBottom: '47px' }}
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
              style={{ height: `${itemHeight}px` }}
            >
              <div className="log-index">#{actualIndex + 1}</div>

              <div className="log-thumbnail">
                <ExecutionThumbnail
                  src={!screenshotStatus.isError ? log.screenshot : undefined}
                  alt={`Screenshot ${actualIndex + 1}`}
                  onClick={() => handleThumbnailClick(null, log)}
                  className="execution-detail-item"
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
    </div>
  );
};
