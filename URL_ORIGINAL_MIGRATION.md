# Migração para URL Original

## Resumo da Mudança

Esta atualização garante que **apenas a URL inicial da gravação** seja utilizada em todos os contextos (Cypress e Replay), removendo o comportamento incorreto de usar a URL do momento em que a gravação é pausada.

## Mudanças Implementadas

### 1. Atualização do Tipo RecordingEntry

**Arquivo:** `src/pages/types/recording.ts`

- Adicionado novo campo `urlOriginal` como campo principal para armazenar a URL inicial
- Campos `url` e `firstUrl` mantidos temporariamente para compatibilidade
- Migração automática de dados existentes

### 2. Captura da URL Inicial

**Arquivo:** `src/pages/Common/utils.ts`

- `setStartRecordingStorage()` já captura e salva a URL inicial como `firstUrl`
- Esta URL é preservada durante toda a gravação

### 3. Uso Consistente da URL

#### Durante o Salvamento
**Arquivo:** `src/pages/Common/endRecording.ts`

- Removido comportamento de buscar URL atual da aba
- Usa exclusivamente `firstUrl` capturada no início
- Se `firstUrl` não existir, a gravação não é salva (evita dados inconsistentes)

#### No Serviço de Gravação
**Arquivo:** `src/pages/storage/recording-service.ts`

- `createRecording()` salva a URL recebida como `urlOriginal`
- Mantém `url` para compatibilidade temporária
- Importação/exportação atualizada para suportar novo campo

#### No Replay
**Arquivo:** `src/modules/replay/replay-handler.ts`

- Usa `urlOriginal` como primeira opção
- Fallback para `firstUrl` ou `url` se necessário
- Garante que a aba seja aberta na URL correta

#### Na Geração de Código
**Arquivo:** `src/pages/Popup/components/RecordingDetail.tsx`

- Template Cypress usa `urlOriginal` para `cy.visit()`
- Interface mostra a URL original corretamente

### 4. Migração de Dados Existentes

**Arquivo:** `src/pages/storage/recording-store.ts`

- Método `migrateToUrlOriginal()` migra gravações existentes
- Prioridade: `firstUrl` > `url` > 'unknown'
- Executado automaticamente na inicialização

**Arquivo:** `src/pages/storage/migration.ts`

- Sistema de migração versionado
- Executado uma vez por versão
- Marca migrações como completas

### 5. Testes

Criados testes unitários para validar:

- **recording-store.test.ts**: Migração de URLs
- **endRecording.test.ts**: Uso exclusivo de firstUrl
- **replay-handler.test.ts**: Fallback correto de URLs

## Fluxo de Dados

1. **Início da Gravação:** URL capturada e salva como `firstUrl`
2. **Durante a Gravação:** `firstUrl` permanece inalterada
3. **Fim da Gravação:** `firstUrl` é usada para criar `urlOriginal`
4. **Replay/Cypress:** Sempre usa `urlOriginal`

## Compatibilidade

- Gravações antigas são migradas automaticamente
- Fallback para campos legados se necessário
- Nenhuma perda de dados

## Verificação

Para verificar que tudo está funcionando:

1. Inicie uma nova gravação em `https://example.com`
2. Navegue para outras páginas
3. Finalize a gravação
4. Verifique no histórico: a URL deve ser `https://example.com`
5. Execute o replay: deve abrir em `https://example.com`
6. Baixe o código Cypress: `cy.visit()` deve usar `https://example.com`