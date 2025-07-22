import { useState, useEffect, useCallback } from 'react';

interface ExecutionNavState {
  selectedExecutionId: string | null;
  isLoading: boolean;
}

export const useExecutionNav = () => {
  const [state, setState] = useState<ExecutionNavState>({
    selectedExecutionId: null,
    isLoading: false,
  });

  // Lê o ID da execução da URL hash no carregamento inicial
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/#exec=([^&]+)/);
    if (match) {
      setState((prev) => ({ ...prev, selectedExecutionId: match[1] }));
    }
  }, []);

  // Atualiza a URL hash quando o ID da execução muda
  useEffect(() => {
    if (state.selectedExecutionId) {
      window.location.hash = `#exec=${state.selectedExecutionId}`;
    } else {
      // Remove o hash se não houver execução selecionada
      if (window.location.hash.includes('#exec=')) {
        window.location.hash = '';
      }
    }
  }, [state.selectedExecutionId]);

  const navigateToExecution = useCallback((executionId: string) => {
    setState((prev) => ({ ...prev, selectedExecutionId: executionId }));
  }, []);

  const navigateBack = useCallback(() => {
    setState((prev) => ({ ...prev, selectedExecutionId: null }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  return {
    selectedExecutionId: state.selectedExecutionId,
    isLoading: state.isLoading,
    navigateToExecution,
    navigateBack,
    setLoading,
  };
};
