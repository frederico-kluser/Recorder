# Changelog

## [Unreleased] - Timestamp Support

### Added
- **Timestamp recording**: Agora todas as ações capturadas incluem timestamp preciso usando `Date.now()`
- **Wait commands**: Scripts gerados automaticamente inserem comandos wait entre ações baseados no tempo real decorrido:
  - Playwright: `await page.waitForTimeout(ms)`
  - Puppeteer: `await page.waitForTimeout(ms)`
  - Cypress: `cy.wait(ms)`
- **Configuração de timing**: Nova interface `TimingConfig` permite controlar:
  - `enableWaits`: Habilita/desabilita inserção de waits (padrão: true)
  - `minWaitMs`: Tempo mínimo para inserir wait (padrão: 20ms)
  - `maxWaitMs`: Tempo máximo de wait (padrão: 30000ms)
- **Hook useTimingConfig**: Gerencia configurações de timing com persistência em localStorage
- **Migração de dados**: Funções para migrar ações antigas sem timestamp

### Changed
- `recorder.ts`: Usa `Date.now()` ao invés de `event.timeStamp` para timestamps absolutos
- `BaseAction`: Propriedade `timestamp` agora é sempre preenchida
- `ScriptBuilder`: Adiciona waits automaticamente entre ações baseado em timestamps
- `genCode`: Aceita parâmetro opcional `timingConfig`

### Technical Details
- Timestamps são capturados em millisegundos desde epoch (Date.now())
- Waits só são inseridos se a diferença for maior que `minWaitMs`
- Waits maiores que `maxWaitMs` são truncados com comentário explicativo
- Ações sem timestamp (versões antigas) recebem timestamp incremental na migração
- Timestamps negativos (relógio ajustado) são corrigidos automaticamente