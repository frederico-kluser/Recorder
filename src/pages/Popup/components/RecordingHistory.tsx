/**
 * Componente para exibir o histórico de gravações com tabela moderna e busca
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { RecordingEntry } from '../../types/recording';
import { RecordingService } from '../../storage/recording-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faSearch,
  faTrash,
  faChevronLeft,
  faClock,
  faGlobe,
  faPlay,
  faCalendarAlt,
  faTasks,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { truncateText, truncateUrl } from '../../Common/utils/text';
import '../themes/dark-core.css';
import './recording-history.css';

interface RecordingHistoryProps {
  onSelectRecording: (recording: RecordingEntry) => void;
  onBack: () => void;
}

type SortField = 'title' | 'startedAt' | 'actions';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

/**
 * Componente de histórico de gravações
 */
export const RecordingHistory: React.FC<RecordingHistoryProps> = ({
  onSelectRecording,
  onBack,
}) => {
  const [recordings, setRecordings] = useState<RecordingEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'startedAt',
    direction: 'desc',
  });

  // Carrega as gravações ao montar o componente
  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      console.log('🚀 [RecordingHistory] Carregando gravações...');
      setLoading(true);
      const data = await RecordingService.listRecordings();
      console.log(
        `✅ [RecordingHistory] ${data.length} gravações carregadas com sucesso`
      );
      setRecordings(data);
    } catch (error) {
      console.error('❌ [RecordingHistory] Erro ao carregar gravações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtra e ordena gravações
  const processedRecordings = useMemo(() => {
    let filtered = recordings;

    // Aplicar filtro de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = recordings.filter(
        (recording) =>
          recording.title.toLowerCase().includes(term) ||
          recording.hostname.toLowerCase().includes(term) ||
          recording.url.toLowerCase().includes(term)
      );
    }

    // Aplicar ordenação
    const sorted = [...filtered].sort((a, b) => {
      const { field, direction } = sortConfig;
      let aValue: any = a[field];
      let bValue: any = b[field];

      if (field === 'actions') {
        aValue = a.actions.length;
        bValue = b.actions.length;
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [recordings, searchTerm, sortConfig]);

  const handleSort = useCallback((field: SortField) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (confirm('Tem certeza que deseja excluir esta gravação?')) {
      try {
        console.log(`🗑️ [RecordingHistory] Excluindo gravação: ${id}`);
        await RecordingService.removeRecording(id);
        console.log('✅ [RecordingHistory] Gravação excluída com sucesso');
        setSelectedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        await loadRecordings();
      } catch (error) {
        console.error('❌ [RecordingHistory] Erro ao excluir gravação:', error);
      }
    }
  };

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (
      selectedIds.size === processedRecordings.length &&
      processedRecordings.length > 0
    ) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(processedRecordings.map((r) => r.id)));
    }
  }, [selectedIds, processedRecordings]);


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

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hoje ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem ${date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }

    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRowClick = useCallback(
    (recording: RecordingEntry) => {
      onSelectRecording(recording);
    },
    [onSelectRecording]
  );

  return (
    <div className="ds-dark recording-history">
      {/* Header */}
      <div className="recording-history-header">
        <h2 className="recording-history-title">
          <FontAwesomeIcon icon={faHistory} />
          Histórico de Gravações
        </h2>
        <button className="recording-btn recording-btn-back" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar
        </button>
      </div>

      {/* Content */}
      <div className="recording-history-content">
        {/* Toolbar */}
        <div className="recording-history-toolbar">
          <div className="recording-history-search">
            <FontAwesomeIcon
              icon={faSearch}
              className="recording-history-search-icon"
            />
            <input
              type="text"
              className="recording-history-search-input"
              placeholder="Buscar por site ou URL..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {selectedIds.size > 0 && (
            <div className="recording-history-selection-info">
              <span>{selectedIds.size} selecionado(s)</span>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="recording-history-table-container">
          {loading ? (
            <div className="recording-history-loading">
              <FontAwesomeIcon
                icon={faSpinner}
                className="recording-history-loading-icon"
              />
              <span>Carregando gravações...</span>
            </div>
          ) : processedRecordings.length === 0 ? (
            <div className="recording-history-empty">
              <div className="recording-history-empty-icon">
                {searchTerm ? '🔍' : '📝'}
              </div>
              <div className="recording-history-empty-text">
                {searchTerm
                  ? 'Nenhuma gravação encontrada para esta busca.'
                  : 'Nenhuma gravação salva ainda.'}
              </div>
              {searchTerm && (
                <div className="recording-history-empty-hint">
                  Tente buscar com outros termos
                </div>
              )}
            </div>
          ) : (
            <table className="recording-history-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="recording-checkbox"
                      checked={
                        selectedIds.size === processedRecordings.length &&
                        processedRecordings.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="sortable" onClick={() => handleSort('title')}>
                    <div className="header-content">
                      <FontAwesomeIcon icon={faGlobe} />
                      <span>Gravação</span>
                      {sortConfig.field === 'title' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('startedAt')}
                  >
                    <div className="header-content">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>Data</span>
                      {sortConfig.field === 'startedAt' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th>
                    <div className="header-content">
                      <FontAwesomeIcon icon={faClock} />
                      <span>Duração</span>
                    </div>
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('actions')}
                  >
                    <div className="header-content">
                      <FontAwesomeIcon icon={faTasks} />
                      <span>Ações</span>
                      {sortConfig.field === 'actions' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th style={{ width: '60px' }}></th>
                </tr>
              </thead>
              <tbody>
                {processedRecordings.map((recording) => (
                  <tr
                    key={recording.id}
                    className={selectedIds.has(recording.id) ? 'selected' : ''}
                    onClick={() => handleRowClick(recording)}
                  >
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="recording-checkbox"
                        checked={selectedIds.has(recording.id)}
                        onChange={() => toggleSelection(recording.id)}
                      />
                    </td>
                    <td>
                      <div className="recording-info">
                        <div className="recording-title">
                          {truncateText(recording.title, 35)}
                        </div>
                        <div className="recording-url">
                          {truncateUrl(recording.url, 40)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="recording-date">
                        {formatDate(recording.startedAt)}
                      </span>
                    </td>
                    <td>
                      <span className="recording-duration">
                        {formatDuration(recording.startedAt, recording.endedAt)}
                      </span>
                    </td>
                    <td>
                      <span className="recording-actions-badge">
                        {recording.actions.length}
                      </span>
                    </td>
                    <td>
                      <button
                        className="recording-delete-btn"
                        onClick={(e) => handleDelete(recording.id, e)}
                        title="Excluir gravação"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
