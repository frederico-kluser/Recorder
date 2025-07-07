# Atualização do Template Cypress - Resumo da Implementação

## O que foi implementado:

### 1. **TemplateRenderer.ts**
- Novo módulo responsável por gerar scripts Cypress no formato solicitado
- Localização: `src/pages/generators/template/TemplateRenderer.ts`
- Características:
  - Gera arquivo com array `sizes` contendo apenas `['custom', width, height]`
  - Usa `forEach` para iterar sobre os sizes
  - Inclui `${cy.env}` no describe
  - Valida viewport e sanitiza URLs
  - Suporta configuração de viewport customizada

### 2. **Atualizações no CypressScriptBuilder**
- Adicionado método `buildScriptWithTemplate()` para usar o novo template
- Nova função exportável `genCypressCodeWithTemplate()`
- Mantida compatibilidade com código existente

### 3. **Atualizações nos tipos**
- Campo opcional `cypressTemplate` adicionado ao tipo `RecordingEntry`
- Interface `RecordingExportContext` para contexto de exportação

### 4. **Atualizações no RecordingService**
- Gera ambas as versões do código (antiga e nova com template)
- Suporte para importação com geração automática do template

### 5. **Atualizações no download**
- Arquivos agora são salvos como `.cy.js` ao invés de `.spec.ts`
- Usa o novo template quando disponível

## Formato do arquivo gerado:

```javascript
/// <reference types="cypress" />

const sizes = [
    ['custom', 1366, 768],
]

sizes.forEach(size => {
    var deviceName = size[0]

    describe(
        `${deviceName} ${cy.env}: Nome do Teste`,
        {
            viewportWidth: size[1],
            viewportHeight: size[2],
        },
        () => {
            beforeEach(() => {
                cy.visit('URL_DA_GRAVACAO')
            })

            it('Gravado com Fleury Cypress Recorder', () => {
                // Comandos Cypress gerados
            })
        }
    )
})
```

## Como testar:

1. Execute `npm run build-chrome` (já executado com sucesso)
2. Carregue a extensão no Chrome
3. Grave uma sessão de teste
4. No popup da extensão, acesse o histórico
5. Clique em uma gravação e depois em "Baixar teste"
6. O arquivo baixado estará no novo formato

## Notas importantes:

- A implementação mantém compatibilidade com gravações existentes
- Gravações antigas continuarão funcionando normalmente
- O novo template é gerado automaticamente para novas gravações
- O viewport padrão é 1366x768 (pode ser customizado no futuro)