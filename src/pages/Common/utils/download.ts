/**
 * Utilitários para download de arquivos
 */

/**
 * Interface para arquivo exportável de teste
 */
export interface ExportableTest {
  filename: string;
  content: string;
}

/**
 * Sanitiza o nome do arquivo removendo caracteres inválidos
 * @param filename - Nome original do arquivo
 * @returns Nome sanitizado
 */
function sanitizeFilename(filename: string): string {
  // Remove caracteres não permitidos em nomes de arquivo
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_') // Caracteres inválidos
    .replace(/\s+/g, '_') // Espaços por underscore
    .replace(/_+/g, '_') // Múltiplos underscores por um
    .replace(/^_|_$/g, '') // Remove underscores do início e fim
    .toLowerCase();
}

/**
 * Cria um nome de arquivo baseado no título da gravação
 * @param title - Título da gravação
 * @returns Nome do arquivo .cy.js
 */
export function createTestFilename(title: string): string {
  const sanitized = sanitizeFilename(title);
  const timestamp = new Date().toISOString().split('T')[0];

  // Se o título ficar vazio após sanitização, usa um nome padrão
  const baseName = sanitized || 'cypress-test';

  return `${baseName}_${timestamp}.cy.js`;
}

/**
 * Faz o download de um arquivo de teste TypeScript
 * @param filename - Nome do arquivo
 * @param content - Conteúdo do arquivo
 */
export function downloadTestFile(filename: string, content: string): void {
  try {
    // Cria um blob com o conteúdo
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // Cria URL temporária para o blob
    const url = URL.createObjectURL(blob);

    // Cria elemento <a> para trigger do download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    // Adiciona ao DOM temporariamente e clica
    document.body.appendChild(link);
    link.click();

    // Limpa recursos
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`✅ [Download] Arquivo ${filename} baixado com sucesso`);
  } catch (error) {
    console.error('❌ [Download] Erro ao baixar arquivo:', error);
    throw new Error('Falha ao baixar o arquivo de teste');
  }
}

/**
 * Prepara o código Cypress para download
 * @param code - Código Cypress gerado
 * @param title - Título da gravação
 * @returns Objeto com filename e content
 */
export function prepareTestDownload(
  code: string,
  title: string
): ExportableTest {
  return {
    filename: createTestFilename(title),
    content: code,
  };
}