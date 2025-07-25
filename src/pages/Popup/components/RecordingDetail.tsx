/**
 * Componente para exibir os detalhes de uma gravação específica
 */

import React, { useState, useCallback, useMemo } from 'react';
import { RecordingEntry } from '../../types/recording';
import { ScriptType } from '../../types';
import { useReplay } from '../../../replay/api/hooks';
import { CacheMode } from '../../../replay/types/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { genCypressCodeWithTemplate } from '../../builders';
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
  faRedo,
  faStop,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyToClipboardFixed = CopyToClipboard as any;
import ActionList from '../../Content/ActionList';
import { ExecutionHistoryNavigator } from './ExecutionHistoryNavigator';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const SyntaxHighlighterFixed = SyntaxHighlighter as any;
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
  const [viewMode, setViewMode] = useState<'actions' | 'code' | 'execution'>(
    'code'
  );
  const [copied, setCopied] = useState(false);
  const [cacheMode, setCacheMode] = useState<CacheMode>(CacheMode.KEEP_CACHE);
  const [state, actions] = useReplay();

  const getCypressCode = useMemo((): string => {
    console.log('🔄 [RecordingDetail] Gerando código para Cypress');

    // Se já tem o template novo, usa ele
    if (recording.code.cypressTemplate) {
      return recording.code.cypressTemplate;
    }

    // Senão, gera o template novo a partir das ações
    try {
      return genCypressCodeWithTemplate(
        recording.actions,
        {
          testName: recording.title,
          url:
            recording.urlOriginal || recording.firstUrl || recording.url || '/',
          exportOptions: {
            viewportWidth: 1366,
            viewportHeight: 768,
          },
        },
        true
      );
    } catch (error) {
      console.error(
        '❌ Erro ao gerar template novo, usando código antigo:',
        error
      );
      return recording.code.cypress;
    }
  }, [recording]);

  const handleCopy = useCallback(() => {
    console.log(
      '📋 [RecordingDetail] Código copiado para área de transferência'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleDownload = useCallback(() => {
    try {
      const code = getCypressCode;
      const { filename, content } = prepareTestDownload(code, recording.title);
      downloadTestFile(filename, content);
    } catch (error) {
      console.error('❌ [RecordingDetail] Erro ao baixar teste:', error);
    }
  }, [getCypressCode, recording.title]);

  const handleReplay = useCallback(async () => {
    try {
      console.log(
        '🎬 [RecordingDetail] Iniciando replay da gravação:',
        recording.id,
        'Modo:',
        cacheMode
      );
      await actions.start(recording.id, cacheMode === CacheMode.CLEAN_CACHE);
    } catch (error) {
      console.error('❌ [RecordingDetail] Erro ao iniciar replay:', error);
    }
  }, [recording.id, cacheMode, actions]);

  const handleStopReplay = useCallback(() => {
    console.log('⏹️ [RecordingDetail] Parando replay');
    actions.stop();
  }, [actions]);

  const handlePauseReplay = useCallback(() => {
    console.log('⏸️ [RecordingDetail] Pausando replay');
    actions.pause();
  }, [actions]);

  const handleResumeReplay = useCallback(() => {
    console.log('▶️ [RecordingDetail] Retomando replay');
    actions.resume();
  }, [actions]);

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
              <span
                className="recording-detail-meta-url"
                title={
                  recording.urlOriginal || recording.firstUrl || recording.url
                }
              >
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
            <button
              className={`recording-detail-tab ${
                viewMode === 'execution' ? 'active' : ''
              }`}
              onClick={() => setViewMode('execution')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} />
              Execução
            </button>
          </div>

          {viewMode === 'code' && (
            <div className="recording-detail-actions">
              <span className="recording-detail-script-type">Cypress</span>

              <CopyToClipboardFixed text={getCypressCode} onCopy={handleCopy}>
                <button className="recording-btn recording-btn-secondary">
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </CopyToClipboardFixed>

              <button
                className="recording-btn recording-btn-primary"
                onClick={handleDownload}
              >
                <FontAwesomeIcon icon={faDownload} />
                Baixar teste
              </button>
            </div>
          )}

          {viewMode === 'actions' && (
            <div className="recording-detail-actions">
              {state.status === 'RUNNING' || state.status === 'PAUSED' ? (
                <>
                  {state.status === 'PAUSED' ? (
                    <button
                      className="recording-btn recording-btn-success"
                      onClick={handleResumeReplay}
                      disabled={state.isLoading}
                    >
                      <FontAwesomeIcon icon={faPlay} />
                      Retomar
                    </button>
                  ) : (
                    <button
                      className="recording-btn recording-btn-warning"
                      onClick={handlePauseReplay}
                      disabled={state.isLoading}
                    >
                      <FontAwesomeIcon icon={faSpinner} />
                      Pausar
                    </button>
                  )}
                  <button
                    className="recording-btn recording-btn-danger"
                    onClick={handleStopReplay}
                    disabled={state.isLoading}
                  >
                    <FontAwesomeIcon icon={faStop} />
                    Parar
                  </button>
                </>
              ) : (
                <>
                  <select
                    className="recording-select"
                    value={cacheMode}
                    onChange={(e) => setCacheMode(e.target.value as CacheMode)}
                  >
                    <option value={CacheMode.KEEP_CACHE}>Manter Cache</option>
                    <option value={CacheMode.CLEAN_CACHE}>Limpar Cache</option>
                  </select>
                  <button
                    className="recording-btn recording-btn-primary"
                    onClick={handleReplay}
                    disabled={recording.actions.length === 0 || state.isLoading}
                  >
                    <FontAwesomeIcon
                      icon={state.isLoading ? faSpinner : faRedo}
                      spin={state.isLoading}
                    />
                    {state.isLoading ? 'Iniciando...' : 'Reproduzir'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Replay Status */}
        {state.status !== 'IDLE' && (
          <div
            className={`recording-detail-replay-status ${
              state.status === 'ERROR' ? 'error' : ''
            }`}
          >
            <div className="recording-detail-replay-status-content">
              {state.isLoading && (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin />
                  <span>Preparando replay...</span>
                </>
              )}
              {state.status === 'RUNNING' && !state.isLoading && (
                <>
                  <FontAwesomeIcon icon={faPlay} />
                  <span>Executando ações...</span>
                  <div className="recording-detail-replay-progress">
                    <div
                      className="recording-detail-replay-progress-bar"
                      style={{
                        width: `${state.progress}%`,
                      }}
                    />
                  </div>
                </>
              )}
              {state.status === 'PAUSED' && (
                <>
                  <FontAwesomeIcon icon={faSpinner} />
                  <span>Replay pausado ({Math.round(state.progress)}%)</span>
                </>
              )}
              {state.status === 'COMPLETED' && (
                <>
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Replay concluído com sucesso!</span>
                </>
              )}
              {state.status === 'ERROR' && (
                <>
                  <FontAwesomeIcon icon={faSpinner} />
                  <span>Erro: {state.error || 'Erro desconhecido'}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* View Content */}
        <div className="recording-detail-view">
          {viewMode === 'actions' ? (
            <div className="recording-detail-actions-view">
              <ActionList actions={recording.actions} />
            </div>
          ) : viewMode === 'code' ? (
            <div className="recording-detail-code-view">
              <div className="recording-detail-code-header">
                <span className="recording-detail-code-title">
                  Código Cypress Gerado
                </span>
              </div>
              <div className="recording-detail-code-content">
                <SyntaxHighlighterFixed
                  language="javascript"
                  style={vscDarkPlus}
                  customStyle={{
                    background: 'none',
                    padding: 0,
                    overflow: 'auto',
                    paddingRight: '1em',
                    paddingBottom: '1em',
                  }}
                  data-testid="code-block"
                >
                  {getCypressCode}
                </SyntaxHighlighterFixed>
              </div>
            </div>
          ) : (
            <div className="recording-detail-execution-view">
              <ExecutionHistoryNavigator recordingId={recording.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
