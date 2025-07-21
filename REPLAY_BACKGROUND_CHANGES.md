# Mudanças no Sistema de Replay - Controle pelo Background

## Resumo das Alterações

O sistema de replay foi refatorado para ser totalmente controlado pelo background script, garantindo que o replay continue funcionando mesmo quando o popup é fechado ou quando há mudanças de aba/URL.

## Arquivos Modificados/Criados

### 1. `/src/pages/Background/replay-controller.ts` (NOVO)
- **Função**: Controller singleton que gerencia todo o ciclo de vida do replay no background
- **Principais features**:
  - Gerenciamento de estado persistente de replays ativos
  - Sistema de logging detalhado com níveis (OK, FAIL, INFO, WARN)
  - Suporte a configuração via chrome.storage.sync
  - Monitoramento de navegação e mudanças de aba
  - Sistema de batch logging para performance
  - Re-injeção automática do runner após navegação

### 2. `/src/pages/Background/index.ts`
- **Mudanças**:
  - Importa e inicializa o `replayController`
  - Adiciona listeners para mensagens `REPLAY_REQUEST` e `REPLAY_STOP`
  - Remove dependência do `replayHandler` antigo

### 3. `/src/types/replay.ts`
- **Mudanças**:
  - Adiciona enum `ReplayMessageType` com novos tipos de mensagem
  - Atualiza interface `ReplayState` para usar `currentStep` e `tabId`
  - Adiciona tipos `RUNNER_READY` e `BG_STATUS`

### 4. `/src/modules/replay/replay-runner.ts`
- **Mudanças principais**:
  - Adiciona função `logToBackground()` para enviar logs formatados
  - Marca global `window.deploysentinel_runner_loaded` para identificação
  - Logs detalhados em TODAS as etapas:
    - Início e fim de cada ação
    - Tentativas e retries
    - Tempos de espera e delays
    - Navegação e limpeza de cache
  - Notifica background quando runner está pronto
  - Envia atualizações de progresso em tempo real
  - Suporta comando `REPLAY_STOP` para interromper execução

### 5. `/src/hooks/use-replay.ts`
- **Mudanças**:
  - Atualiza para usar nova estrutura de `ReplayState`
  - Adiciona suporte para mensagens `BG_STATUS` com logs
  - Melhora tratamento de mensagens `REPLAY_STATUS` e `REPLAY_RESULT`
  - Adiciona logs no console para debugging

## Sistema de Logging

### Formato dos Logs
```
[REPLAY-BG] [Tab:123] ✅ Mensagem - detalhes opcionais
[REPLAY-RUNNER] ✅ Mensagem - detalhes opcionais
```

### Níveis de Log
- ✅ **OK**: Operação completada com sucesso
- ❌ **FAIL**: Falha na operação
- ℹ️ **INFO**: Informação sobre progresso
- ⚠️ **WARN**: Aviso sobre situação não ideal

### Logs Capturados
1. **Background Controller**:
   - Inicialização e configuração
   - Criação e fechamento de abas
   - Injeção de scripts
   - Mudanças de navegação
   - Estados do replay

2. **Runner**:
   - Carregamento do runner
   - Início e fim de cada ação
   - Detalhes de cliques, digitação e navegação
   - Espera por elementos
   - Delays entre ações
   - Limpeza de cache
   - Erros e retries

## Como os Delays são Respeitados

O sistema calcula automaticamente o delay entre ações baseado nos timestamps originais:

```typescript
const delay = nextAction 
  ? nextAction.timestamp - action.timestamp 
  : 500; // Delay padrão para última ação

// Log do delay
logToBackground('runReplay', 'INFO', 
  `Action ${i + 1} completed. Waiting ${actualDelay}ms`);

// Aguarda com limite máximo
await sleep(Math.min(delay, 3000));
```

## Fluxo de Execução

1. **Popup** → Envia `REPLAY_REQUEST` para background
2. **Background Controller**:
   - Cria nova aba com URL inicial
   - Aguarda página carregar
   - Injeta replay runner
   - Aguarda confirmação `RUNNER_READY`
   - Envia `REPLAY_EXECUTE` com ações
3. **Runner**:
   - Limpa cache se necessário
   - Navega para URL inicial se diferente
   - Executa cada ação com logs detalhados
   - Respeita delays originais entre ações
   - Envia `REPLAY_STATUS` durante execução
   - Envia `REPLAY_RESULT` ao finalizar
4. **Background** → Propaga status para popup e limpa estado

## Benefícios da Nova Arquitetura

1. **Persistência**: Replay continua mesmo se popup fechar
2. **Robustez**: Sobrevive a mudanças de aba e navegação
3. **Visibilidade**: Logs detalhados em cada etapa
4. **Configurabilidade**: Suporte a configurações customizadas
5. **Performance**: Sistema de batch logging
6. **Extensibilidade**: Hooks para futuras extensões

## Como Testar

1. Abra o console do background script (chrome://extensions → DeploySentinel → Service Worker)
2. Inicie um replay normalmente pelo popup
3. Observe os logs detalhados no console
4. Feche o popup - o replay continuará
5. Mude de aba - o replay continuará
6. Todos os delays originais serão respeitados

## Configuração (Opcional)

Pode-se customizar via chrome.storage.sync:
```javascript
{
  replayConfig: {
    maxRetries: 3,
    defaultTimeout: 5000,
    logLevel: 'debug' // ou 'info', 'error'
  }
}
```