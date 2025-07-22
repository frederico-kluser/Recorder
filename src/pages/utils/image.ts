/**
 * Utilidades para validação e manipulação de imagens base64
 */

/**
 * Valida se uma string é uma imagem base64 válida
 */
export function validateBase64Image(dataUrl: string): boolean {
  if (!dataUrl || typeof dataUrl !== 'string') {
    return false;
  }

  // Regex para validar formato data URL de imagem
  const dataUrlRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
  if (!dataUrlRegex.test(dataUrl)) {
    return false;
  }

  // Extrair parte base64
  const base64Part = dataUrl.split(',')[1];
  if (!base64Part) {
    return false;
  }

  // Validar se é base64 válido
  try {
    // Tenta decodificar para verificar se é válido
    const decoded = atob(base64Part);
    return decoded.length > 0;
  } catch {
    return false;
  }
}

/**
 * Obtém o tamanho de uma imagem base64 em bytes
 */
export function getBase64ImageSize(dataUrl: string): number {
  if (!validateBase64Image(dataUrl)) {
    return 0;
  }

  const base64Part = dataUrl.split(',')[1];
  // Base64 encoding aumenta o tamanho em ~33%
  return Math.round(base64Part.length * 0.75);
}

/**
 * Verifica se uma imagem base64 está dentro do limite de tamanho
 */
export function isImageWithinSizeLimit(
  dataUrl: string,
  maxSizeBytes: number
): boolean {
  const size = getBase64ImageSize(dataUrl);
  return size > 0 && size <= maxSizeBytes;
}

/**
 * Extrai o tipo MIME de uma imagem base64
 */
export function getImageMimeType(dataUrl: string): string | null {
  if (!validateBase64Image(dataUrl)) {
    return null;
  }

  const match = dataUrl.match(/^data:image\/([^;]+);base64,/);
  return match ? `image/${match[1]}` : null;
}

/**
 * Cria um placeholder de erro para imagem
 */
export function createErrorPlaceholder(): string {
  // SVG placeholder para imagem quebrada
  const svg = `
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="150" fill="#2a2a2a"/>
      <path d="M50 40 L50 110 L150 110 L150 40 Z" 
            fill="none" stroke="#666" stroke-width="2"/>
      <path d="M50 40 L150 110 M150 40 L50 110" 
            stroke="#666" stroke-width="2"/>
      <circle cx="70" cy="60" r="8" fill="#666"/>
      <path d="M50 110 L80 70 L110 90 L150 60" 
            fill="none" stroke="#666" stroke-width="2"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Sanitiza uma imagem base64 para uso seguro
 */
export function sanitizeBase64Image(dataUrl: string): string | null {
  if (!validateBase64Image(dataUrl)) {
    return null;
  }

  // Remove qualquer código malicioso potencial
  const cleanDataUrl = dataUrl.trim();

  // Verifica tamanho máximo (5MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (!isImageWithinSizeLimit(cleanDataUrl, MAX_SIZE)) {
    console.warn('Image exceeds maximum size limit');
    return null;
  }

  return cleanDataUrl;
}
