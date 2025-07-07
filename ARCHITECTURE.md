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

## Roadmap: Sistema de Automação Inteligente com LLM e Waits Contextuais

### Problemas Atuais

**1. Seletores Frágeis:**

- Baseados em heurísticas simples que quebram com mudanças de layout
- Não consideram contexto semântico ou intenção do usuário
- Dependem de atributos voláteis (classes CSS dinâmicas)

**2. Waits Temporais Arbitrários:**

```javascript
cy.wait(2000); // ❌ Tempo fixo, não contextual
```

### Nova Arquitetura: LLM-Driven Test Generation

### 1. **Geração de Seletores Semânticos com LLM**

**Estratégia MCP (Model Context Protocol):**

- Usar snapshots estruturados de acessibilidade em vez de DOM raw
- Integrar com **Anthropic's MCP** para interações web mais confiáveis
- Priorizar elementos com contexto semântico forte

```typescript
interface SelectorContext {
  domSnapshot: AccessibilitySnapshot;
  userIntent: string;
  actionType: ActionType;
  elementHierarchy: ElementPath[];
  visualContext: VisualClues;
  previousActions: Action[];
}

interface LLMSelectorResponse {
  primarySelector: string;
  fallbackSelectors: string[];
  confidence: number;
  reasoning: string;
  stability: 'high' | 'medium' | 'low';
  validationPassed: boolean;
}
```

**Estratégias do LLM:**

1. **Priorização Semântica:**

   - Elementos com `role`, `aria-label`, `data-testid`
   - Texto visível e contexto funcional
   - Hierarquia semântica (form > fieldset > input)

2. **Validação em Tempo Real:**

   - Testar seletor no DOM antes de aceitar
   - Verificar unicidade e estabilidade
   - Gerar múltiplos candidatos ranqueados

3. **Auto-healing:**
   - Detectar falhas de seletor em execuções futuras
   - Re-gerar seletores com contexto atualizado
   - Aprender com padrões de falha

### 2. **Sistema de Waits Inteligentes**

**Tipos de Wait Context-Aware:**

#### A. **UI State Waits**

```typescript
// ❌ Antes: cy.wait(2000)
// ✅ Depois: Aguardar mudança de estado específica
cy.get('[data-loading]').should('not.exist');
cy.get('[data-error]').should('not.exist');
cy.get('[data-success="true"]').should('exist');
```

#### B. **Network-Aware Waits**

```typescript
// Interceptar automaticamente requests relevantes
cy.intercept('POST', '/api/orders/**').as('createOrder');
cy.get('#submit-order').click();
cy.wait('@createOrder').then((interception) => {
  expect(interception.response.statusCode).to.equal(200);
});
```

#### C. **Element Readiness Waits**

```typescript
// Aguardar elemento estar realmente interativo
cy.get('#next-button')
  .should('be.visible')
  .should('not.be.disabled')
  .should('not.have.class', 'loading');
```

#### D. **Animation & Transition Waits**

```typescript
// Aguardar animações terminarem
cy.get('.modal').should('have.class', 'modal-open');
cy.get('.modal').should('have.css', 'opacity', '1');
```

### 3. **Arquitetura de Processamento**

```text
Ação Capturada
       ↓
[Context Analyzer] ← DOM + Network + Visual State
       ↓
[LLM Processor] ← Accessibility Snapshot + User Intent
       ↓
[Selector Validator] ← Real-time DOM Testing
       ↓
[Wait Strategy Generator] ← Network Monitor + State Tracker
       ↓
[Script Optimizer] ← Performance + Reliability Rules
       ↓
Código Otimizado
```

### 4. **Configuração Avançada**

```json
{
  "llm": {
    "provider": "anthropic",
    "model": "claude-3-sonnet",
    "useMCP": true,
    "confidenceThreshold": 0.85
  },
  "waits": {
    "strategy": "adaptive",
    "networkTimeout": 10000,
    "maxRetries": 3,
    "autoHeal": true
  },
  "selectors": {
    "priorityOrder": ["data-testid", "aria-label", "role", "text", "css"],
    "fallbackLevels": 3,
    "stabilityCheck": true
  },
  "optimization": {
    "batchLLMCalls": true,
    "cacheSelectors": true,
    "metricsEnabled": true
  }
}
```

### 5. **Implementação Faseada**

#### **Fase 1: Fundação LLM**

- [ ] Interface MCP para snapshots de acessibilidade
- [ ] Sistema de validação de seletores em tempo real
- [ ] Cache inteligente com TTL baseado em estabilidade

#### **Fase 2: Waits Contextuais**

- [ ] Monitor de network requests com padrão matching
- [ ] Detector de mudanças de estado UI
- [ ] Gerador automático de waits baseado em contexto

#### **Fase 3: Auto-healing & Métricas**

- [ ] Sistema de detecção de falhas de seletor
- [ ] Re-geração automática com contexto atualizado
- [ ] Dashboard de métricas de qualidade

#### **Fase 4: Otimização Avançada**

- [ ] Análise preditiva de padrões de falha
- [ ] Sugestões proativas de melhorias
- [ ] Integração com CI/CD para feedback contínuo

## Benefícios Esperados

### **Qualidade dos Testes**

- **98%+ de confiabilidade** dos seletores (vs 70% atual)
- **Redução de 90%** em falsos positivos
- **Execução 5x mais rápida** (waits inteligentes)

### **Manutenibilidade**

- Auto-healing reduz manutenção manual em 80%
- Seletores semânticos resistem a refatorações
- Documentação automática do contexto e intenção

### **Experiência do Desenvolvedor**

- Scripts mais legíveis e auto-documentados
- Feedback em tempo real durante gravação
- Sugestões proativas de melhorias

## Considerações Técnicas

### **Performance & Escalabilidade**

- Batch processing de chamadas LLM
- Cache distribuído com invalidação inteligente
- Fallback rápido para heurísticas quando LLM indisponível

### **Segurança & Privacidade**

- Sanitização automática de dados sensíveis
- Criptografia local de configurações
- Validação rigorosa de outputs LLM

### **Integração & Extensibilidade**

- Plugin system para estratégias customizadas
- Suporte a múltiplos providers LLM
- APIs para integração com ferramentas existentes

---

_Este documento reflete as melhores práticas de 2025 para automação de testes
com IA. Para contribuições, consulte os issues no repositório._
