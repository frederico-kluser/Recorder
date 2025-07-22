/**
 * Testes para o TemplateRenderer
 */

import {
  TemplateRenderer,
  createTemplateRenderer,
  RecordingExportContext,
} from '../TemplateRenderer';
import { ActionType } from '../../../types';

describe('TemplateRenderer', () => {
  let renderer: TemplateRenderer;

  beforeEach(() => {
    renderer = createTemplateRenderer();
  });

  describe('render', () => {
    it('deve gerar template com estrutura correta', () => {
      const context: RecordingExportContext = {
        testName: 'Teste de Login',
        url: 'https://example.com',
        actions: [
          {
            type: ActionType.Click,
            tagName: 'button' as any,
            timestamp: Date.now(),
            selectors: {},
            selector: '', // Added required selector property
            value: '',
            isPassword: false,
            inputType: '',
            hasOnlyText: false,
          },
        ],
        commands: ['\n  cy.get("button").click();\n', '\n  cy.wait(1000);\n'],
        showComments: true,
        exportOptions: {
          viewportWidth: 1366,
          viewportHeight: 768,
        },
      };

      const result = renderer.render(context);

      // Verifica estrutura básica
      expect(result).toContain('/// <reference types="cypress" />');
      expect(result).toContain('const sizes = [');
      expect(result).toContain("['custom', 1366, 768]");
      expect(result).toContain('sizes.forEach(size => {');
      expect(result).toContain('describe(');
      expect(result).toContain('${cy.env}: Teste de Login');
      expect(result).toContain('viewportWidth: size[1]');
      expect(result).toContain('viewportHeight: size[2]');
      expect(result).toContain('beforeEach(() => {');
      expect(result).toContain("cy.visit('https://example.com')");
      expect(result).toContain(
        "it('Gravado com Fleury Cypress Recorder', () => {"
      );
      expect(result).toContain('cy.get("button").click();');
      expect(result).toContain('cy.wait(1000);');
    });

    it('deve sanitizar URLs corretamente', () => {
      const context: RecordingExportContext = {
        testName: 'Teste',
        url: 'javascript:alert("xss")',
        actions: [],
        commands: ['\n  cy.get("body").click();\n'],
        showComments: false,
      };

      const result = renderer.render(context);
      expect(result).toContain("cy.visit('#')");
      expect(result).not.toContain('javascript:');
    });

    it('deve escapar backticks no nome do teste', () => {
      const context: RecordingExportContext = {
        testName: 'Teste com `backticks`',
        url: 'https://example.com',
        actions: [],
        commands: ['\n  cy.get("body").click();\n'],
        showComments: false,
      };

      const result = renderer.render(context);
      expect(result).toContain('Teste com \\`backticks\\`');
    });

    it('deve validar viewport inválido', () => {
      const context: RecordingExportContext = {
        testName: 'Teste',
        url: 'https://example.com',
        actions: [],
        commands: ['\n  cy.get("body").click();\n'],
        showComments: false,
        exportOptions: {
          viewportWidth: 100, // muito pequeno
          viewportHeight: 768,
        },
      };

      expect(() => renderer.render(context)).toThrow('Viewport width inválido');
    });

    it('deve lançar erro quando não há comandos', () => {
      const context: RecordingExportContext = {
        testName: 'Teste',
        url: 'https://example.com',
        actions: [],
        commands: [],
        showComments: false,
      };

      expect(() => renderer.render(context)).toThrow(
        'Não há ações para exportar'
      );
    });

    it('deve usar valores padrão quando exportOptions não é fornecido', () => {
      const context: RecordingExportContext = {
        testName: 'Teste',
        url: 'https://example.com',
        actions: [],
        commands: ['\n  cy.get("body").click();\n'],
        showComments: false,
      };

      const result = renderer.render(context);
      expect(result).toContain("['custom', 1366, 768]");
    });
  });
});
