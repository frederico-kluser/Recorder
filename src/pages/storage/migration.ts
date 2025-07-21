/**
 * Script de migração para garantir que todas as gravações tenham urlOriginal
 */

import { recordingStore } from './recording-store';

/**
 * Executa todas as migrações necessárias
 */
export async function runMigrations(): Promise<void> {
  console.log('🔄 Iniciando migrações de dados...');
  
  try {
    // Inicializa o store (que já executa migrateToUrlOriginal)
    await recordingStore.initialize();
    
    // Migra última gravação do formato antigo se existir
    await recordingStore.migrateLastRecording();
    
    console.log('✅ Migrações concluídas com sucesso');
  } catch (error) {
    console.error('❌ Erro durante migrações:', error);
  }
}

/**
 * Verifica se as migrações já foram executadas nesta versão
 */
export async function checkMigrationStatus(): Promise<boolean> {
  return new Promise((resolve) => {
    chrome.storage.local.get('migrationVersion', (result) => {
      const currentVersion = '2.0.0'; // Versão que introduz urlOriginal
      resolve(result.migrationVersion === currentVersion);
    });
  });
}

/**
 * Marca as migrações como executadas
 */
export async function markMigrationComplete(): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ migrationVersion: '2.0.0' }, () => {
      resolve();
    });
  });
}

/**
 * Executa migrações se necessário
 */
export async function executeMigrationsIfNeeded(): Promise<void> {
  const alreadyMigrated = await checkMigrationStatus();
  
  if (!alreadyMigrated) {
    await runMigrations();
    await markMigrationComplete();
  }
}