import React, { useMemo } from 'react';
import { ExecutionMeta } from '../../types/execution';
import './execution-table.css';

interface ExecutionTableProps {
  executions: ExecutionMeta[];
  onExecutionClick: (id: string) => void;
  onExecutionDelete?: (id: string) => void;
  pageSize?: number;
}

export const ExecutionTable: React.FC<ExecutionTableProps> = ({
  executions,
  onExecutionClick,
  onExecutionDelete,
  pageSize = 20,
}) => {
  const sortedExecutions = useMemo(() => {
    return [...executions].sort((a, b) => b.endedAt - a.endedAt);
  }, [executions]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleDelete = (e: React.MouseEvent, executionId: string) => {
    e.stopPropagation();
    if (
      onExecutionDelete &&
      window.confirm('Tem certeza que deseja deletar esta execução?')
    ) {
      onExecutionDelete(executionId);
    }
  };

  const formatDuration = (start: number, end: number) => {
    const duration = end - start;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const getStatusIcon = (hasErrors: boolean) => {
    return hasErrors ? '❌' : '✅';
  };

  return (
    <div className="execution-table-container">
      <table className="execution-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Data da Execução</th>
            <th>Duração</th>
            <th>Passos</th>
            <th>URL</th>
            {onExecutionDelete && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {sortedExecutions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">
                Nenhuma execução encontrada
              </td>
            </tr>
          ) : (
            sortedExecutions.map((execution) => (
              <tr
                key={execution.id}
                onClick={() => onExecutionClick(execution.id)}
                className={`execution-row ${
                  execution.hasErrors ? 'has-errors' : ''
                }`}
              >
                <td className="status-cell">
                  <span
                    className="status-icon"
                    title={execution.hasErrors ? 'Com erros' : 'Sucesso'}
                  >
                    {getStatusIcon(execution.hasErrors)}
                  </span>
                </td>
                <td className="date-cell">{formatDate(execution.endedAt)}</td>
                <td className="duration-cell">
                  {formatDuration(execution.startedAt, execution.endedAt)}
                </td>
                <td className="steps-cell">{execution.stepCount}</td>
                <td className="url-cell" title={execution.url}>
                  {execution.url || 'N/A'}
                </td>
                {onExecutionDelete && (
                  <td className="actions-cell">
                    <button
                      className="delete-button"
                      onClick={(e) => handleDelete(e, execution.id)}
                      title="Deletar execução"
                    >
                      🗑️
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
