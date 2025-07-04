/**
 * Componente para exibir o histórico de gravações
 */

import React, { useEffect, useState, useMemo } from 'react';
import { RecordingEntry } from '../../types/recording';
import { RecordingService } from '../../storage/recording-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHistory, 
  faSearch, 
  faTrash, 
  faDownload,
  faChevronLeft,
  faClock,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import './styles.css';

interface RecordingHistoryProps {
  onSelectRecording: (recording: RecordingEntry) => void;
  onBack: () => void;
}

/**
 * Componente de histórico de gravações
 */
export const RecordingHistory: React.FC<RecordingHistoryProps> = ({ 
  onSelectRecording, 
  onBack 
}) => {
  const [recordings, setRecordings] = useState<RecordingEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Carrega as gravações ao montar o componente
  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      setLoading(true);
      const data = await RecordingService.listRecordings();
      setRecordings(data);
    } catch (error) {
      console.error('Erro ao carregar gravações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtra gravações baseado no termo de busca
  const filteredRecordings = useMemo(() => {
    if (!searchTerm.trim()) {
      return recordings;
    }

    const term = searchTerm.toLowerCase();
    return recordings.filter(recording => 
      recording.title.toLowerCase().includes(term) ||
      recording.hostname.toLowerCase().includes(term) ||
      recording.url.toLowerCase().includes(term)
    );
  }, [recordings, searchTerm]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir a gravação ao clicar em deletar
    
    if (confirm('Tem certeza que deseja excluir esta gravação?')) {
      try {
        await RecordingService.removeRecording(id);
        await loadRecordings();
      } catch (error) {
        console.error('Erro ao excluir gravação:', error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const idsToExport = selectedIds.size > 0 
        ? Array.from(selectedIds) 
        : undefined;
      
      const json = await RecordingService.exportRecordings(idsToExport);
      
      // Cria blob e faz download
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recordings_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar gravações:', error);
    }
  };

  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
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

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Hoje ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ontem ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="recording-history">
      {/* Header */}
      <div className="history-header">
        <button className="back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2>
          <FontAwesomeIcon icon={faHistory} /> Histórico de Gravações
        </h2>
      </div>

      {/* Toolbar */}
      <div className="history-toolbar">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por site ou URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="toolbar-actions">
          {selectedIds.size > 0 && (
            <span className="selection-count">
              {selectedIds.size} selecionado(s)
            </span>
          )}
          <button 
            className="export-button"
            onClick={handleExport}
            title="Exportar gravações"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>

      {/* Lista de gravações */}
      <div className="recordings-list">
        {loading ? (
          <div className="loading">Carregando gravações...</div>
        ) : filteredRecordings.length === 0 ? (
          <div className="empty-state">
            {searchTerm ? 
              'Nenhuma gravação encontrada para esta busca.' : 
              'Nenhuma gravação salva ainda.'
            }
          </div>
        ) : (
          filteredRecordings.map(recording => (
            <div
              key={recording.id}
              className={`recording-item ${selectedIds.has(recording.id) ? 'selected' : ''}`}
              onClick={() => onSelectRecording(recording)}
            >
              <div className="recording-select">
                <input
                  type="checkbox"
                  checked={selectedIds.has(recording.id)}
                  onChange={() => toggleSelection(recording.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              
              <div className="recording-info">
                <div className="recording-title">
                  <FontAwesomeIcon icon={faGlobe} className="icon" />
                  {recording.title}
                </div>
                <div className="recording-meta">
                  <span className="date">
                    <FontAwesomeIcon icon={faClock} className="icon" />
                    {formatDate(recording.startedAt)}
                  </span>
                  <span className="duration">
                    {formatDuration(recording.startedAt, recording.endedAt)}
                  </span>
                  <span className="actions-count">
                    {recording.actions.length} ações
                  </span>
                </div>
              </div>
              
              <button
                className="delete-button"
                onClick={(e) => handleDelete(recording.id, e)}
                title="Excluir gravação"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};