# Sistema de Replay - Documentação

## Visão Geral

O novo sistema de replay foi completamente refatorado para seguir a arquitetura
definida em `replay.md`. Este sistema permite reproduzir gravações de ações do
usuário de forma confiável e configurável.

## Arquitetura

```
src/replay/
├── api/            # API pública para comunicação
├── config/         # Gerenciamento de configuração
├── core/           # Motor principal e executors
│   ├── engine.ts   # ReplayEngine (singleton)
│   └── executors/  # Executors para cada tipo de ação
├── types/          # Definições TypeScript
└── utils/          # Utilitários internos
```

## Como Usar

### No Popup (React)

```typescript
import { useReplay } from '../replay/api/hooks';

function MyComponent() {
  const [state, actions] = useReplay();

  // Iniciar replay
  await actions.start(recordingId, cleanCache);

  // Pausar
  await actions.pause();

  // Retomar
  await actions.resume();

  // Parar
  await actions.stop();

  // Verificar estado
  console.log(state.status); // IDLE, RUNNING, PAUSED, COMPLETED, ERROR
  console.log(state.progress); // 0-100
}
```

### Configuração

```typescript
import { getReplayConfig, setReplayConfig } from '../replay/config';

// Obter configuração atual
const config = await getReplayConfig();

// Atualizar configuração
await setReplayConfig({
  maxRetries: 5,
  retryDelay: 2000,
  autoScroll: false,
});
```

## Fluxo de Execução

1. **Popup** chama `startReplay(recordingId, options)`
2. **API** envia mensagem `REPLAY_CMD` para background
3. **Background** delega para `ReplayEngine`
4. **ReplayEngine**:
   - Cria nova sessão
   - Abre nova aba
   - Injeta `replay-runner.bundle.js`
   - Executa ações sequencialmente
5. **Runner** executa cada ação na página
6. **Progress** é enviado de volta ao Popup

## Modos de Cache

- `CLEAN_CACHE`: Limpa todos os dados antes do replay
- `KEEP_CACHE`: Mantém cache e cookies existentes

## Estados do Replay

- `IDLE`: Nenhum replay ativo
- `RUNNING`: Executando ações
- `PAUSED`: Pausado temporariamente
- `COMPLETED`: Finalizado com sucesso
- `ERROR`: Erro durante execução

## Persistência

O sistema salva automaticamente o progresso a cada 20 ações (configurável) em
`chrome.storage.local` com a chave `ds_replay_state`.

## Mensagens

Todas as mensagens seguem o padrão TypeScript definido em `types/events.ts`:

- `REPLAY_START`: Inicia novo replay
- `REPLAY_PAUSE`: Pausa execução
- `REPLAY_RESUME`: Retoma execução
- `REPLAY_STOP`: Para e limpa replay
- `REPLAY_PROGRESS`: Atualização de progresso
- `REPLAY_COMPLETED`: Replay concluído
- `REPLAY_ERROR`: Erro durante execução

## Executors Suportados

- `ClickExecutor`: Cliques em elementos
- `InputExecutor`: Digitação em campos
- `NavigateExecutor`: Navegação entre páginas
- `ResizeExecutor`: Redimensionamento de janela
- `ScreenshotExecutor`: Captura de tela
- `ScrollExecutor`: Rolagem da página
- `WheelExecutor`: Eventos de roda do mouse

## Tratamento de Erros

- Retry automático com limite configurável
- Timeouts para ações e carregamento de página
- Mensagens de erro detalhadas
- Estado de erro persistido

## Performance

- Throttling de persistência (500ms)
- Salvamento incremental de progresso
- Execução assíncrona não-bloqueante
- Cache de seletores DOM
