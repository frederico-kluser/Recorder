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
  faGlobe,
  faPlay,
  faCalendarAlt,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import './styles.css';

interface RecordingHistoryProps {
  onSelectRecording: (recording: RecordingEntry) => void;
  onBack: () => void;
}

// Column helper for TanStack Table
const columnHelper = createColumnHelper<RecordingEntry>();

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
  const [sorting, setSorting] = useState<SortingState>([]);

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

  // Filtra gravações baseado no termo de busca
  const filteredRecordings = useMemo(() => {
    if (!searchTerm.trim()) {
      return recordings;
    }

    const term = searchTerm.toLowerCase();
    return recordings.filter(
      (recording) =>
        recording.title.toLowerCase().includes(term) ||
        recording.hostname.toLowerCase().includes(term) ||
        recording.url.toLowerCase().includes(term)
    );
  }, [recordings, searchTerm]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Evita abrir a gravação ao clicar em deletar

    if (confirm('🗑️ Tem certeza que deseja excluir esta gravação?')) {
      try {
        console.log(`🗑️ [RecordingHistory] Excluindo gravação: ${id}`);
        await RecordingService.removeRecording(id);
        console.log('✅ [RecordingHistory] Gravação excluída com sucesso');
        await loadRecordings();
      } catch (error) {
        console.error('❌ [RecordingHistory] Erro ao excluir gravação:', error);
      }
    }
  };

  const handleExport = async () => {
    try {
      console.log('📦 [RecordingHistory] Iniciando exportação...');
      const idsToExport =
        selectedIds.size > 0 ? Array.from(selectedIds) : undefined;

      const json = await RecordingService.exportRecordings(idsToExport);

      // Cria blob e faz download
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recordings_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

      console.log('✅ [RecordingHistory] Exportação concluída com sucesso');
    } catch (error) {
      console.error('❌ [RecordingHistory] Erro ao exportar gravações:', error);
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

  // Definição das colunas da tabela
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: () => (
          <input
            className="custom-checkbox"
            type="checkbox"
            checked={
              selectedIds.size === filteredRecordings.length &&
              filteredRecordings.length > 0
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                setSelectedIds(new Set(filteredRecordings.map((r) => r.id)));
              } else {
                setSelectedIds(new Set());
              }
            }}
          />
        ),
        cell: ({ row }) => (
          <input
            className="custom-checkbox"
            type="checkbox"
            checked={selectedIds.has(row.original.id)}
            onChange={() => toggleSelection(row.original.id)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        ),
        enableSorting: false,
        size: 50,
      }),
      columnHelper.accessor('title', {
        header: 'Gravação',
        cell: ({ row }) => (
          <div>
            <div className="recording-title">
              <FontAwesomeIcon icon={faGlobe} />
              {row.original.title}
            </div>
            <div className="recording-url">{row.original.url}</div>
          </div>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor('startedAt', {
        header: 'Data',
        cell: ({ row }) => (
          <span className="date-badge">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: '6px' }}
            />
            {formatDate(row.original.startedAt)}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'duration',
        header: 'Duração',
        cell: ({ row }) => (
          <span className="duration-badge">
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '6px' }} />
            {formatDuration(row.original.startedAt, row.original.endedAt)}
          </span>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor('actions', {
        header: 'Ações',
        cell: ({ row }) => (
          <span className="actions-badge">
            <FontAwesomeIcon icon={faTasks} style={{ marginRight: '6px' }} />
            {row.original.actions.length}
          </span>
        ),
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'delete',
        header: '',
        cell: ({ row }) => (
          <button
            className="delete-button"
            onClick={(e: React.MouseEvent) => handleDelete(row.original.id, e)}
            title="Excluir gravação"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        ),
        enableSorting: false,
        size: 80,
      }),
    ],
    [
      filteredRecordings,
      selectedIds,
      formatDate,
      formatDuration,
      handleDelete,
      toggleSelection,
    ]
  );

  // Configuração da tabela
  const table = useReactTable({
    data: filteredRecordings,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="modern-recording-history">
      {/* Header */}
      <div className="modern-header">
        <button className="modern-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h2 className="modern-title">
          <FontAwesomeIcon icon={faHistory} />
          Histórico de Gravações
        </h2>
      </div>

      {/* Toolbar */}
      <div
        className="modern-toolbar"
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <div className="modern-search-box">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por site ou URL..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>

        <div className="modern-toolbar-actions">
          {selectedIds.size > 0 && (
            <span className="modern-selection-count">
              {selectedIds.size} selecionado(s)
            </span>
          )}
          <button
            className="modern-export-button"
            onClick={handleExport}
            title="Exportar gravações"
          >
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} />
            Exportar
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="modern-table-container">
        {loading ? (
          <div className="modern-loading-state">
            <FontAwesomeIcon icon={faPlay} style={{ marginRight: '8px' }} />
            Carregando gravações...
          </div>
        ) : filteredRecordings.length === 0 ? (
          <div className="modern-empty-state">
            <div className="emoji">{searchTerm ? '🔍' : '📝'}</div>
            <div>
              {searchTerm
                ? 'Nenhuma gravação encontrada para esta busca.'
                : 'Nenhuma gravação salva ainda.'}
            </div>
          </div>
        ) : (
          <table className="modern-table">
            <thead className="modern-table-header">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="modern-table-header-row">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="modern-table-header-cell"
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      style={{
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getIsSorted() === 'asc'
                        ? ' ↑'
                        : header.column.getIsSorted() === 'desc'
                        ? ' ↓'
                        : ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="modern-table-body">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`modern-table-row ${
                    selectedIds.has(row.original.id) ? 'selected' : ''
                  }`}
                  onClick={() => onSelectRecording(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="modern-table-cell"
                      style={{
                        width:
                          cell.column.getSize() !== 150
                            ? cell.column.getSize()
                            : undefined,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
