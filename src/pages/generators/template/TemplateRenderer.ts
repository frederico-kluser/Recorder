/**
 * Renderizador de templates para scripts Cypress
 * Gera arquivos de teste no formato padrão com suporte a múltiplos dispositivos
 */

import type { Action } from '../../types';

/**
 * Contexto de exportação contendo todas as informações necessárias para gerar o script
 */
export interface RecordingExportContext {
  /** Nome do teste a ser usado no describe */
  testName: string;
  /** URL base do teste */
  url: string;
  /** Array de ações gravadas */
  actions: Action[];
  /** Comandos Cypress gerados a partir das ações */
  commands: string[];
  /** Se deve incluir comentários no código */
  showComments: boolean;
  /** Opções de viewport para o teste */
  exportOptions?: {
    viewportWidth: number;
    viewportHeight: number;
  };
}

/**
 * Opções de configuração do template
 */
export interface TemplateOptions {
  /** Se deve gerar código para múltiplos tamanhos de tela */
  multiSizes: boolean;
  /** Array de configurações de tamanho [nome, largura, altura] */
  sizes: Array<[string, number, number]>;
}

/**
 * Opções padrão do template
 */
const DEFAULT_TEMPLATE_OPTIONS: TemplateOptions = {
  multiSizes: false,
  sizes: [['custom', 1366, 768]]
};

/**
 * Classe responsável por renderizar templates de scripts Cypress
 */
export class TemplateRenderer {
  private options: TemplateOptions;

  constructor(options: Partial<TemplateOptions> = {}) {
    this.options = { ...DEFAULT_TEMPLATE_OPTIONS, ...options };
  }

  /**
   * Escapa backticks em strings para uso em template literals
   * @param str - String a ser escapada
   * @returns String com backticks escapados
   */
  private escapeBackticks(str: string): string {
    return str.replace(/`/g, '\\`');
  }

  /**
   * Sanitiza URLs removendo protocolos não permitidos
   * @param url - URL a ser sanitizada
   * @returns URL sanitizada
   */
  private sanitizeUrl(url: string): string {
    const allowedProtocols = ['http:', 'https:', 'file:'];
    try {
      const urlObj = new URL(url);
      if (!allowedProtocols.includes(urlObj.protocol)) {
        return '#';
      }
      return url;
    } catch {
      return url; // Retorna URL relativa como está
    }
  }

  /**
   * Extrai o hostname da URL para uso no nome do teste
   * @param url - URL completa
   * @returns Hostname ou 'localhost' como fallback
   */
  private extractHostname(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname || 'localhost';
    } catch {
      return 'localhost';
    }
  }

  /**
   * Gera as linhas de comando do Cypress a partir dos comandos
   * @param commands - Array de comandos Cypress
   * @returns Array de strings com os comandos formatados
   */
  private formatCommands(commands: string[]): string[] {
    const filteredCommands = commands
      .filter(cmd => {
        const trimmed = cmd.trim();
        // Remove comandos cy.visit() e cy.viewport() pois já estão no template
        return trimmed && !trimmed.includes('cy.visit(') && !trimmed.includes('cy.viewport(');
      });

    // Processa cada comando, garantindo formatação adequada
    const formattedCommands: string[] = [];
    
    for (let i = 0; i < filteredCommands.length; i++) {
      const cmd = filteredCommands[i].trim();
      
      if (cmd) {
        // Adiciona quebra de linha antes de cada comando
        if (i === 0) {
          formattedCommands.push(`\n                ${cmd}`);
        } else {
          // Se for um comentário, adiciona quebra de linha extra
          if (cmd.startsWith('//')) {
            formattedCommands.push(`\n\n                ${cmd}`);
          } else {
            formattedCommands.push(`\n\n                ${cmd}`);
          }
        }
      }
    }
    
    return formattedCommands;
  }

  /**
   * Extrai dimensões do viewport dos comandos Cypress
   * @param commands - Array de comandos
   * @returns Objeto com largura e altura ou null
   */
  private extractViewportFromCommands(commands: string[]): { width: number; height: number } | null {
    for (const cmd of commands) {
      const viewportMatch = cmd.match(/cy\.viewport\((\d+),\s*(\d+)\)/);
      if (viewportMatch) {
        return {
          width: parseInt(viewportMatch[1], 10),
          height: parseInt(viewportMatch[2], 10)
        };
      }
    }
    return null;
  }

  /**
   * Renderiza o template completo do script Cypress
   * @param context - Contexto de exportação com todas as informações
   * @returns Script Cypress formatado como string
   */
  render(context: RecordingExportContext): string {
    const { testName, url, commands, exportOptions } = context;
    
    // Tenta extrair viewport dos comandos primeiro
    const extractedViewport = this.extractViewportFromCommands(commands);
    
    // Valida viewport
    const viewportWidth = extractedViewport?.width || exportOptions?.viewportWidth || 1366;
    const viewportHeight = extractedViewport?.height || exportOptions?.viewportHeight || 768;
    
    if (viewportWidth < 320 || viewportWidth > 7680) {
      throw new Error(`Viewport width inválido: ${viewportWidth}. Deve estar entre 320 e 7680.`);
    }
    
    if (viewportHeight < 240 || viewportHeight > 4320) {
      throw new Error(`Viewport height inválido: ${viewportHeight}. Deve estar entre 240 e 4320.`);
    }

    // Valida se há comandos
    if (!commands || commands.length === 0) {
      throw new Error('Não há ações para exportar');
    }

    const hostname = this.extractHostname(url);
    const sanitizedUrl = this.sanitizeUrl(url);
    const formattedCommands = this.formatCommands(commands);
    
    // Determina o nome do dispositivo baseado no tamanho
    const deviceName = viewportWidth >= 1366 ? 'Desktop' : 'custom';
    const sizes = [[deviceName, viewportWidth, viewportHeight]];

    // Gera o template
    return `/// <reference types="cypress" />

const sizes = [
    ['custom', ${viewportWidth}, ${viewportHeight}],
]

sizes.forEach(size => {
    var deviceName = size[0]

    describe(
        \`\${deviceName} \${cy.env}: ${this.escapeBackticks(testName || `Teste ${hostname}`)}\`,
        {
            viewportWidth: size[1],
            viewportHeight: size[2],
        },
        () => {
            beforeEach(() => {
                cy.visit('${sanitizedUrl}')
            })

            it('Gravado com Fleury Cypress Recorder', () => {${formattedCommands.length > 0 ? formattedCommands.join('') + '\n            ' : ''}})
        
        }
    )
})
`;
  }

  /**
   * Atualiza as opções do renderer
   * @param options - Novas opções parciais
   */
  updateOptions(options: Partial<TemplateOptions>): void {
    this.options = { ...this.options, ...options };
  }
}

/**
 * Factory function para criar uma instância do TemplateRenderer
 * @param options - Opções do template
 * @returns Nova instância do TemplateRenderer
 */
export function createTemplateRenderer(options?: Partial<TemplateOptions>): TemplateRenderer {
  return new TemplateRenderer(options);
}