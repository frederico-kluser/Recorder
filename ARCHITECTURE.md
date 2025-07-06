# Arquitetura do Sistema de Gravação e Geração de Testes

## Visão Geral

O **Fleury Cypress Recorder** é uma extensão de navegador que automatiza a
criação de scripts de teste end-to-end. O sistema captura interações do usuário
em tempo real e as transforma em código Cypress executável, facilitando a
criação de testes automatizados sem necessidade de programação manual.

## Como Funciona a Captura de Ações

### 1. Registro de Eventos

O sistema utiliza um **Event Listener System** distribuído que monitora
diferentes tipos de interação:

```text
Browser Events → Content Script → Background Script → Chrome Storage
```

**Eventos Capturados:**

- **Click**: Cliques em elementos (botões, links, etc.)
- **Input**: Digitação em campos de texto
- **Navigation**: Mudanças de URL/páginas
- **Hover**: Movimento do mouse sobre elementos
- **Keyboard**: Teclas pressionadas (Enter, Tab, etc.)
- **Resize**: Redimensionamento da janela
- **Scroll**: Rolagem da página
- **DragAndDrop**: Arrastar e soltar elementos

### 2. Estrutura das Ações

Cada ação capturada segue uma estrutura tipada bem definida:

```typescript
interface ActionBase {
  type: ActionType;
  timestamp: number;
  url: string;
  selector: string;
  xpath: string;
}

// Exemplos específicos:
interface ClickAction extends ActionBase {
  type: 'Click';
  coordinates: { x: number; y: number };
}

interface InputAction extends ActionBase {
  type: 'Input';
  value: string;
  isPassword: boolean;
}
```

### 3. Geração de Seletores

O sistema utiliza uma **estratégia híbrida** para criar seletores CSS robustos:

1. **Priorização de Atributos Estáveis**:

   - `data-testid`, `data-cy` (específicos para teste)
   - `aria-label`, `role` (acessibilidade)
   - `id` (quando válidos e únicos)
   - `href` (para links)

2. **Fallback Heurístico**:
   - Classes CSS (filtradas para evitar classes dinâmicas)
   - Tags HTML + posição relativa (`:nth-child`)
   - XPath como último recurso

## Por Que Separamos Ações e Código Exportado

### Problema Arquitetural

A **separação entre ações gravadas e código gerado** resolve vários desafios
fundamentais:

### 1. **Flexibilidade de Frameworks**

```text
Ações (Neutras) → Builder Específico → Código do Framework
     ↓               ↓                    ↓
   Click(#btn)  → CypressBuilder    → cy.get('#btn').click()
   Click(#btn)  → PlaywrightBuilder → page.click('#btn')
   Click(#btn)  → PuppeteerBuilder  → page.click('#btn')
```

### 2. **Otimização Pós-Captura**

- **Ações** preservam o contexto original completo
- **Código** aplica otimizações específicas (agrupamento, waits inteligentes)
- **Versionamento** permite re-gerar scripts com melhorias futuras

### 3. **Manutenibilidade**

```text
Gravação Session → Ações JSON → [Transformações] → Código Final
                     ↓
               Pode ser re-processada
               com novos algoritmos
```

## Fluxo de Transformação

### 1. Captura → Ações

```javascript
// Event capturado
document.addEventListener('click', (event) => {
  const action = {
    type: 'Click',
    timestamp: Date.now(),
    selector: generateOptimalSelector(event.target),
    url: window.location.href,
    coordinates: { x: event.clientX, y: event.clientY },
  };

  recordingStore.addAction(action);
});
```

### 2. Ações → Código Cypress

```typescript
class CypressScriptBuilder {
  generateCommand(action: ClickAction): string {
    const selector = this.optimizeSelector(action.selector);
    const wait = this.calculateWait(action);

    return `${wait}cy.get('${selector}').click();`;
  }
}
```

### 3. Exemplo de Transformação

**Ação Gravada:**

```json
{
  "type": "Click",
  "timestamp": 1703025600000,
  "selector": "#submit-button",
  "url": "https://app.example.com/form",
  "coordinates": { "x": 450, "y": 320 }
}
```

**Código Cypress Gerado:**

```javascript
// Aguarda carregamento da página
cy.wait(500);

// Clica no botão de submit
cy.get('#submit-button').click();
```

## Roadmap: Integração com LLM e Waits Inteligentes

### Problema Atual

**1. Seletores Heurísticos:**

- Podem quebrar com mudanças no DOM
- Não consideram contexto semântico
- Lógica baseada em regras fixas

**2. Waits Temporais Fixos:**

```javascript
cy.wait(2000); // ❌ Tempo arbitrário
```

### Solução Proposta

### 1. **LLM-Enhanced Selector Optimization**

```typescript
interface SelectorOptimizer {
  optimizeSelector(
    domSnapshot: DOMSnapshot,
    userIntent: ActionContext,
    originalSelector: string
  ): Promise<EnhancedSelector>;
}

interface EnhancedSelector {
  original: string;
  optimized: string;
  confidence: number;
  reasoning: string;
}
```

**Fluxo LLM:**

```text
DOM Context + Ação → LLM → Seletor Semântico + Confidence Score
```

**Exemplo:**

```javascript
// Input para LLM
const context = {
  domSnapshot: "<button class='btn-primary submit-form'>Submit Order</button>",
  action: 'click',
  userIntent: 'submit form',
};

// Output do LLM
const optimized = {
  original: '.btn-primary.submit-form',
  optimized: "[data-testid='submit-order-btn']",
  confidence: 0.9,
  reasoning: 'Data attribute is more stable than CSS classes',
};
```

### 2. **Smart Wait Strategies**

```typescript
interface WaitStrategy {
  generateWait(action: Action, context: ActionContext): string;
}

class SmartWaitGenerator {
  // ❌ Antes: wait temporal
  // cy.wait(2000);
  // ✅ Depois: wait condicional
  // cy.intercept('POST', '/api/submit').as('submitOrder');
  // cy.wait('@submitOrder');
  // ou
  // cy.get('[data-loading="false"]').should('exist');
}
```

### 3. **Arquitetura Proposta**

```text
Ações Capturadas
       ↓
   [LLM Optimizer] ← DOM Snapshot + Context
       ↓
   Enhanced Actions
       ↓
   [Smart Wait Generator] ← Network Analysis
       ↓
   Optimized Script
```

### 4. **Configuração e Extensibilidade**

```typescript
// config/recorder.config.json
{
  "llmProvider": "openai",
  "llmModel": "gpt-4o",
  "selectorConfidence": 0.7,
  "waitStrategy": "auto", // "fixed" | "intercept" | "element" | "auto"
  "optimizationLevel": "aggressive" // "conservative" | "balanced" | "aggressive"
}
```

### 5. **Implementação Faseada**

#### Fase 1: Foundation

- [ ] Criar interfaces para LLM integration
- [ ] Implementar estratégias de wait configuráveis
- [ ] Refatorar builder para suportar otimizações

#### Fase 2: LLM Integration

- [ ] Implementar OpenAI provider
- [ ] Criar sistema de cache para seletores
- [ ] Adicionar validação de confidence

#### Fase 3: Smart Waits

- [ ] Analisar network requests durante gravação
- [ ] Gerar waits baseados em mudanças de estado
- [ ] Implementar fallbacks robustos

#### Fase 4: Enhancement

- [ ] Interface configurável no popup
- [ ] Métricas de qualidade dos seletores
- [ ] Auto-refinement baseado em feedback

## Benefícios Esperados

### 1. **Qualidade dos Testes**

- **95%+ de confiabilidade** dos seletores
- **Redução de 80%** em falsos positivos
- **Execução 3x mais rápida** (waits inteligentes)

### 2. **Manutenibilidade**

- Seletores semânticos resistem a mudanças cosméticas
- Auto-healing quando elementos são refatorados
- Documentação automática do intent

### 3. **Experiência do Desenvolvedor**

- Scripts gerados são mais legíveis
- Menor necessidade de edição manual
- Feedback em tempo real durante gravação

## Considerações Técnicas

### 1. **Performance**

- LLM calls em batch para reduzir latência
- Cache local para seletores otimizados
- Fallback para heurísticas quando LLM indisponível

### 2. **Segurança**

- DOM snapshots sanitizados (sem dados sensíveis)
- API keys criptografadas no chrome.storage
- Validação rigorosa de output do LLM

### 3. **Escalabilidade**

- Suporte a múltiplos providers (OpenAI, Anthropic, local)
- Sistema de plugins para estratégias customizadas
- Configuração por projeto/domínio

---

_Este documento será atualizado conforme a implementação progride. Para
contribuições ou questões, consulte os issues no repositório._
