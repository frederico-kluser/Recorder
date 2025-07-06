/**
 * Utilitários para manipulação de texto
 */

/**
 * Trunca um texto adicionando reticências ao final
 * @param text - Texto a ser truncado
 * @param maxLength - Comprimento máximo (padrão: 40)
 * @returns Texto truncado com reticências
 */
export function truncateText(text: string, maxLength: number = 40): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}...`;
}

/**
 * Trunca URL removendo protocolo e mantendo apenas domínio e parte do caminho
 * @param url - URL completa
 * @param maxLength - Comprimento máximo
 * @returns URL truncada
 */
export function truncateUrl(url: string, maxLength: number = 50): string {
  if (!url) return '';

  // Remove protocolo
  const withoutProtocol = url.replace(/^https?:\/\//, '');

  if (withoutProtocol.length <= maxLength) {
    return withoutProtocol;
  }

  // Tenta manter o domínio e parte do caminho
  const parts = withoutProtocol.split('/');
  const domain = parts[0];

  if (domain.length >= maxLength) {
    return truncateText(domain, maxLength);
  }

  // Adiciona partes do caminho até atingir o limite
  let result = domain;
  for (let i = 1; i < parts.length; i++) {
    const nextPart = `/${parts[i]}`;
    if (result.length + nextPart.length > maxLength - 3) {
      return result + '...';
    }
    result += nextPart;
  }

  return result;
}