/**
 * Componente para exibir os detalhes de uma gravação específica
 */

import React, { useState } from 'react';
import { RecordingEntry } from '../../types/recording';
import { ScriptType } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faCode,
  faList,
  faCopy,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ActionList from '../../Content/ActionList';
import CodeGen from '../../Content/CodeGen';
import './styles.css';

interface RecordingDetailProps {
  recording: RecordingEntry;
  onBack: () => void;
  library: ScriptType;
  onLibraryChange: (library: ScriptType) => void;
}

/**
 * Componente de detalhes da gravação
 */
export const RecordingDetail: React.FC<RecordingDetailProps> = ({
  recording,
  onBack,
  library,
  onLibraryChange,
}) => {
  const [viewMode, setViewMode] = useState<'actions' | 'code'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    console.log(
      '📋 [RecordingDetail] Código copiado para área de transferência'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCodeForLibrary = (): string => {
    const libraryName =
      library === ScriptType.Cypress
        ? 'Cypress'
        : library === ScriptType.Playwright
        ? 'Playwright'
        : library === ScriptType.Puppeteer
        ? 'Puppeteer'
        : 'Cypress';
    console.log(
      `🔄 [RecordingDetail] Gerando código para biblioteca: ${libraryName}`
    );
    switch (library) {
      case ScriptType.Cypress:
        return recording.code.cypress;
      case ScriptType.Playwright:
        return recording.code.playwright;
      case ScriptType.Puppeteer:
        return recording.code.puppeteer;
      default:
        return recording.code.cypress;
    }
  };

  return (
    <div className="recording-detail">
      {/* Header */}
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>{' '}
        <div className="header-info">
          <h2>📹 {recording.title}</h2>
          <div className="recording-meta">
            <span>📅 {formatDate(recording.startedAt)}</span>
            <span>🎯 {recording.actions.length} ações gravadas</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="detail-toolbar">
        <div className="view-toggle">
          <button
            className={`toggle-button ${
              viewMode === 'actions' ? 'active' : ''
            }`}
            onClick={() => setViewMode('actions')}
          >
            <FontAwesomeIcon icon={faList} /> Ações
          </button>
          <button
            className={`toggle-button ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => setViewMode('code')}
          >
            <FontAwesomeIcon icon={faCode} /> Código
          </button>
        </div>

        {viewMode === 'code' && (
          <div className="code-actions">
            <select
              value={library}
              onChange={(e) =>
                onLibraryChange(
                  parseInt(e.target.value, 10) as unknown as ScriptType
                )
              }
              className="library-select"
            >
              <option value={ScriptType.Cypress}>Cypress</option>
              <option value={ScriptType.Playwright}>Playwright</option>
              <option value={ScriptType.Puppeteer}>Puppeteer</option>
            </select>

            <CopyToClipboard text={getCodeForLibrary()} onCopy={handleCopy}>
              <button className="copy-button">
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                {copied ? '✅ Copiado!' : '📋 Copiar'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="detail-content">
        {viewMode === 'actions' ? (
          <div className="actions-view">
            <ActionList actions={recording.actions} />
          </div>
        ) : (
          <div className="code-view">
            <CodeGen actions={recording.actions} library={library} />
          </div>
        )}
      </div>
    </div>
  );
};
