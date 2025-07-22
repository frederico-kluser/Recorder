/**
 * Configurações de UI para a extensão
 */

export interface ExecutionUIConfig {
  // Tamanho máximo das miniaturas em pixels
  thumbnailMaxPx: number;
  // Número de itens por página na tabela de execuções
  pageSize: number;
  // Duração da animação de transição em ms
  transitionDuration: number;
  // Tempo de debounce para atualizações de storage em ms
  storageDebounceMs: number;
}

export interface UIConfig {
  executionUI: ExecutionUIConfig;
}

// Configuração padrão
export const DEFAULT_UI_CONFIG: UIConfig = {
  executionUI: {
    thumbnailMaxPx: 120,
    pageSize: 20,
    transitionDuration: 200,
    storageDebounceMs: 250,
  },
};

// Hook para usar configuração de UI
export const useExecutionConfig = (): ExecutionUIConfig => {
  // Por enquanto retorna a configuração padrão
  // No futuro pode ser estendido para ler de chrome.storage
  return DEFAULT_UI_CONFIG.executionUI;
};
