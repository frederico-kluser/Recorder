/**
 * Componente para exibir os detalhes de uma gravação específica
 */

import React, { useState, useCallback } from 'react';
import { RecordingEntry } from '../../types/recording';
import { ScriptType } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faCode,
  faList,
  faCopy,
  faCheck,
  faPlay,
  faCalendarAlt,
  faTasks,
  faGlobe,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ActionList from '../../Content/ActionList';
import CodeGen from '../../Content/CodeGen';
import { truncateText } from '../../Common/utils/text';
import {
  downloadTestFile,
  prepareTestDownload,
} from '../../Common/utils/download';
import '../themes/dark-core.css';
import './recording-detail.css';

interface RecordingDetailProps {
  recording: RecordingEntry;
  onBack: () => void;
}

/**
 * Componente de detalhes da gravação
 */
export const RecordingDetail: React.FC<RecordingDetailProps> = ({
  recording,
  onBack,
}) => {
  const [viewMode, setViewMode] = useState<'actions' | 'code'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    console.log(
      '📋 [RecordingDetail] Código copiado para área de transferência'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleDownload = useCallback(() => {
    try {
      const code = getCypressCode();
      const { filename, content } = prepareTestDownload(code, recording.title);
      downloadTestFile(filename, content);
    } catch (error) {
      console.error('❌ [RecordingDetail] Erro ao baixar teste:', error);
    }
  }, [recording]);

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

  const getCypressCode = (): string => {
    console.log('🔄 [RecordingDetail] Gerando código para Cypress');
    return recording.code.cypress;
  };

  const formatDuration = (start: number, end: number): string => {
    const duration = end - start;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="ds-dark recording-detail">
      {/* Header */}
      <div className="recording-detail-header">
        <div className="recording-detail-header-info">
          <h2 className="recording-detail-title">
            <FontAwesomeIcon icon={faPlay} />
            <span className="recording-detail-title-text">
              {truncateText(recording.title, 50)}
            </span>
          </h2>
          <div className="recording-detail-meta">
            <span className="recording-detail-meta-item">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="recording-detail-meta-icon"
              />
              {formatDate(recording.startedAt)}
            </span>
            <span className="recording-detail-meta-item">
              <FontAwesomeIcon
                icon={faTasks}
                className="recording-detail-meta-icon"
              />
              {recording.actions.length} ações em{' '}
              {formatDuration(recording.startedAt, recording.endedAt)}
            </span>
            <span className="recording-detail-meta-item">
              <FontAwesomeIcon
                icon={faGlobe}
                className="recording-detail-meta-icon"
              />
              <span className="recording-detail-meta-url" title={recording.url}>
                {recording.hostname}
              </span>
            </span>
          </div>
        </div>
        <button className="recording-btn recording-btn-back" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </button>
      </div>

      {/* Content */}
      <div className="recording-detail-content">
        {/* Toolbar */}
        <div className="recording-detail-toolbar">
          <div className="recording-detail-tabs">
            <button
              className={`recording-detail-tab ${
                viewMode === 'actions' ? 'active' : ''
              }`}
              onClick={() => setViewMode('actions')}
            >
              <FontAwesomeIcon icon={faList} />
              Ações
            </button>
            <button
              className={`recording-detail-tab ${
                viewMode === 'code' ? 'active' : ''
              }`}
              onClick={() => setViewMode('code')}
            >
              <FontAwesomeIcon icon={faCode} />
              Código
            </button>
          </div>

          {viewMode === 'code' && (
            <div className="recording-detail-actions">
              <span className="recording-detail-script-type">Cypress</span>

              <CopyToClipboard text={getCypressCode()} onCopy={handleCopy}>
                <button className="recording-btn recording-btn-secondary">
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </CopyToClipboard>

              <button
                className="recording-btn recording-btn-primary"
                onClick={handleDownload}
              >
                <FontAwesomeIcon icon={faDownload} />
                Baixar teste
              </button>
            </div>
          )}
        </div>

        {/* View Content */}
        <div className="recording-detail-view">
          {viewMode === 'actions' ? (
            <div className="recording-detail-actions-view">
              <ActionList actions={recording.actions} />
            </div>
          ) : (
            <div className="recording-detail-code-view">
              <div className="recording-detail-code-header">
                <span className="recording-detail-code-title">
                  Código Cypress Gerado
                </span>
              </div>
              <div className="recording-detail-code-content">
                <CodeGen
                  actions={recording.actions}
                  library={ScriptType.Cypress}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
