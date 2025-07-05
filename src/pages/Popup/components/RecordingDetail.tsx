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
  faPlay,
  faCalendarAlt,
  faTasks,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ActionList from '../../Content/ActionList';
import CodeGen from '../../Content/CodeGen';
import './styles.css';

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

  const getCypressCode = (): string => {
    console.log('🔄 [RecordingDetail] Gerando código para Cypress');
    return recording.code.cypress;
  };

  return (
    <div className="modern-recording-detail">
      {/* Header */}
      <div className="modern-detail-header">
        <button className="modern-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="modern-header-info">
          <h2 className="modern-detail-title">
            <FontAwesomeIcon icon={faPlay} />
            {recording.title}
          </h2>
          <div className="modern-recording-meta">
            <span className="modern-meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              {formatDate(recording.startedAt)}
            </span>
            <span className="modern-meta-item">
              <FontAwesomeIcon icon={faTasks} />
              {recording.actions.length} ações gravadas
            </span>
            <span className="modern-meta-item">
              <FontAwesomeIcon icon={faGlobe} />
              {recording.hostname}
            </span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="modern-detail-toolbar">
        <div className="modern-view-toggle">
          <button
            className={`modern-toggle-button ${
              viewMode === 'actions' ? 'active' : ''
            }`}
            onClick={() => setViewMode('actions')}
          >
            <FontAwesomeIcon icon={faList} />
            Ações
          </button>
          <button
            className={`modern-toggle-button ${
              viewMode === 'code' ? 'active' : ''
            }`}
            onClick={() => setViewMode('code')}
          >
            <FontAwesomeIcon icon={faCode} />
            Código
          </button>
        </div>

        {viewMode === 'code' && (
          <div className="modern-code-actions">
            <div className="modern-library-label">
              <span>Cypress</span>
            </div>

            <CopyToClipboard text={getCypressCode()} onCopy={handleCopy}>
              <button
                className={`modern-copy-button ${copied ? 'copied' : ''}`}
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </CopyToClipboard>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="modern-detail-content">
        {viewMode === 'actions' ? (
          <div className="modern-actions-view">
            <ActionList actions={recording.actions} />
          </div>
        ) : (
          <div className="modern-code-view">
            <CodeGen actions={recording.actions} library={ScriptType.Cypress} />
          </div>
        )}
      </div>
    </div>
  );
};
