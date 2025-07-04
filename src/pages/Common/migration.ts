import type { Action } from '../types';

/**
 * Migra ações antigas sem timestamp para ter timestamp baseado em Date.now()
 * @param actions Array de ações potencialmente sem timestamp
 * @returns Array de ações com timestamp garantido
 */
export function migrateActionsTimestamp(actions: Action[]): Action[] {
  const now = Date.now();
  
  return actions.map((action, index) => {
    // Se a ação já tem timestamp válido, mantém
    if (action.timestamp && typeof action.timestamp === 'number' && action.timestamp > 0) {
      return action;
    }
    
    // Se não tem timestamp, adiciona um baseado no índice
    // Adiciona 100ms entre cada ação para simular intervalo natural
    return {
      ...action,
      timestamp: now + (index * 100)
    };
  });
}

/**
 * Valida e corrige timestamps negativos ou inválidos
 * @param actions Array de ações
 * @returns Array de ações com timestamps válidos
 */
export function validateActionTimestamps(actions: Action[]): Action[] {
  let lastValidTimestamp = Date.now();
  
  return actions.map((action) => {
    // Se timestamp é inválido ou negativo
    if (!action.timestamp || action.timestamp < 0 || !Number.isFinite(action.timestamp)) {
      const validAction = {
        ...action,
        timestamp: lastValidTimestamp + 100
      };
      lastValidTimestamp = validAction.timestamp;
      return validAction;
    }
    
    // Se timestamp é menor que o anterior (relógio ajustado)
    if (action.timestamp < lastValidTimestamp) {
      console.warn(`Timestamp negativo detectado: ${action.timestamp} < ${lastValidTimestamp}`);
      const validAction = {
        ...action,
        timestamp: lastValidTimestamp + 100
      };
      lastValidTimestamp = validAction.timestamp;
      return validAction;
    }
    
    lastValidTimestamp = action.timestamp;
    return action;
  });
}