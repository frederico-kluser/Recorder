import React, { useState, useEffect, useMemo } from 'react';
import { ExecutionTable } from './ExecutionTable';
import { ExecutionDetail } from './ExecutionDetail';
import { useExecutionNav } from '../hooks/useExecutionNav';
import { recordingStore } from '../../storage/recording-store';
import { ExecutionMeta, ExecutionLog } from '../../types/execution';
import { ExecutionLog as ReplayExecutionLog } from '../../../replay/types/session';
import './execution-history-navigator.css';

interface ExecutionHistoryNavigatorProps {
  recordingId: string;
}

const convertToReplayLogs = (
  executionLog: ExecutionLog
): ReplayExecutionLog[] => {
  // Converte todos os steps para o formato esperado
  return executionLog.steps.map((step) => ({
    ts: step.timestamp,
    action: {
      type: step.action as any,
      timestamp: step.timestamp,
      selectors: step.selector ? { generalSelector: step.selector } : undefined,
      value: step.value,
    },
    screenshot: step.screenshot || '',
  }));
};

export const ExecutionHistoryNavigator: React.FC<
  ExecutionHistoryNavigatorProps
> = ({ recordingId }) => {
  const { selectedExecutionId, navigateToExecution, navigateBack, setLoading } =
    useExecutionNav();
  const [executions, setExecutions] = useState<ExecutionMeta[]>([]);
  const [selectedExecution, setSelectedExecution] =
    useState<ExecutionLog | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteExecution = async (executionId: string) => {
    try {
      await recordingStore.deleteExecution(recordingId, executionId);
      // Recarrega a lista de execuções
      const executionsList = await recordingStore.listExecutions(recordingId);
      setExecutions(executionsList);
    } catch (err) {
      console.error('Erro ao deletar execução:', err);
      setError('Falha ao deletar execução');
    }
  };

  // Carrega lista de execuções
  useEffect(() => {
    const loadExecutions = async () => {
      setLoading(true);
      try {
        const executionsList = await recordingStore.listExecutions(recordingId);
        setExecutions(executionsList);
      } catch (err) {
        console.error('Erro ao carregar execuções:', err);
        setError('Falha ao carregar execuções');
      } finally {
        setLoading(false);
      }
    };

    loadExecutions();
  }, [recordingId, setLoading]);

  // Carrega execução selecionada
  useEffect(() => {
    const loadSelectedExecution = async () => {
      if (!selectedExecutionId) {
        setSelectedExecution(null);
        return;
      }

      setLoading(true);
      try {
        const execution = await recordingStore.getExecution(
          recordingId,
          selectedExecutionId
        );
        if (execution) {
          setSelectedExecution(execution);
        } else {
          setError('Execução não encontrada');
          navigateBack();
        }
      } catch (err) {
        console.error('Erro ao carregar execução:', err);
        setError('Falha ao carregar detalhes da execução');
        navigateBack();
      } finally {
        setLoading(false);
      }
    };

    loadSelectedExecution();
  }, [selectedExecutionId, recordingId, navigateBack, setLoading]);

  const handleBackClick = () => {
    navigateBack();
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Tentar novamente</button>
        </div>
      );
    }

    if (selectedExecutionId && selectedExecution) {
      return (
        <div className="execution-detail-view">
          <div className="navigation-header">
            <button className="back-button" onClick={handleBackClick}>
              <span className="back-icon">←</span>
              Voltar
            </button>
            <h3 className="execution-title">
              Execução de{' '}
              {new Date(selectedExecution.meta.endedAt).toLocaleString('pt-BR')}
            </h3>
          </div>
          <ExecutionDetail
            executionLogs={convertToReplayLogs(selectedExecution)}
          />
        </div>
      );
    }

    return (
      <div className="execution-list-view">
        <h3 className="list-title">Histórico de Execuções</h3>
        <ExecutionTable
          executions={executions}
          onExecutionClick={navigateToExecution}
          onExecutionDelete={handleDeleteExecution}
        />
      </div>
    );
  };

  return <div className="execution-history-navigator">{renderContent()}</div>;
};
