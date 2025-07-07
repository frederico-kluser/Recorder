import { getBestSelectorForAction } from './selector';

import type { Action } from '../types';
import {
  ActionType,
  BaseAction,
  ScriptType,
  TagName,
  isSupportedActionType,
} from '../types';
import { TimingConfig, DEFAULT_TIMING_CONFIG } from '../types/config';
import type { RecordingExportContext } from '../generators/template/TemplateRenderer';
import { TemplateRenderer, createTemplateRenderer } from '../generators/template/TemplateRenderer';

const FILLABLE_INPUT_TYPES = [
  '',
  'date',
  'datetime',
  'datetime-local',
  'email',
  'month',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'time',
  'url',
  'week',
];

// only used in ActionContext
export const truncateText = (str: string, maxLen: number) => {
  return `${str.substring(0, maxLen)}${str.length > maxLen ? '...' : ''}`;
};

export const isActionStateful = (action: Action) => {
  return action.tagName === TagName.TextArea;
};

type ActionState = {
  causesNavigation: boolean;
  isStateful: boolean;
};

export class ActionContext extends BaseAction {
  private readonly action: Action;

  private readonly scriptType: ScriptType;

  private readonly actionState: ActionState;

  constructor(
    action: Action,
    scriptType: ScriptType,
    actionState: ActionState
  ) {
    super();
    this.action = action;
    this.actionState = actionState;
    this.scriptType = scriptType;
  }

  getType() {
    return this.action.type;
  }

  getTagName() {
    return this.action.tagName;
  }

  getValue() {
    return this.action.value;
  }

  getInputType() {
    return this.action.inputType;
  }

  // (FIXME: shouldn't expose action)
  getAction() {
    return this.action;
  }

  getActionState() {
    return this.actionState;
  }

  getDescription() {
    const { type, selectors, tagName, value } = this.action;

    switch (type) {
      case ActionType.Click:
        return `Click on <${tagName.toLowerCase()}> ${
          selectors.text != null && selectors.text.length > 0
            ? `"${truncateText(selectors.text.replace(/\s/g, ' '), 25)}"`
            : getBestSelectorForAction(this.action, this.scriptType)
        }`;
      case ActionType.Hover:
        return `Hover over <${tagName.toLowerCase()}> ${
          selectors.text != null && selectors.text.length > 0
            ? `"${truncateText(selectors.text.replace(/\s/g, ' '), 25)}"`
            : getBestSelectorForAction(this.action, this.scriptType)
        }`;
      case ActionType.Input:
        return `Fill ${truncateText(
          JSON.stringify(value ?? ''),
          16
        )} on <${tagName.toLowerCase()}> ${getBestSelectorForAction(
          this.action,
          this.scriptType
        )}`;
      case ActionType.Keydown:
        return `Press ${this.action.key} on ${tagName.toLowerCase()}`;
      case ActionType.Load:
        return `Load "${this.action.url}"`;
      case ActionType.Resize:
        return `Resize window to ${this.action.width} x ${this.action.height}`;
      case ActionType.Wheel:
        return `Scroll wheel by X:${this.action.deltaX}, Y:${this.action.deltaY}`;
      case ActionType.FullScreenshot:
        return `Take full page screenshot`;
      case ActionType.AwaitText:
        return `Wait for text ${truncateText(
          JSON.stringify(this.action.text),
          25
        )} to appear`;
      case ActionType.DragAndDrop:
        return `Drag n drop ${getBestSelectorForAction(
          this.action,
          this.scriptType
        )} from (${this.action.sourceX}, ${this.action.sourceY}) to (${
          this.action.targetX
        }, ${this.action.targetY})`;
      default:
        return '';
    }
  }

  getBestSelector(): string | null {
    return getBestSelectorForAction(this.action, this.scriptType);
  }
}

export abstract class ScriptBuilder {
  protected readonly codes: string[];

  protected readonly actionContexts: ActionContext[];

  protected readonly showComments: boolean;

  protected readonly timingConfig: TimingConfig;

  constructor(
    showComments: boolean,
    timingConfig: TimingConfig = DEFAULT_TIMING_CONFIG
  ) {
    this.codes = [];
    this.actionContexts = [];
    this.showComments = showComments;
    this.timingConfig = timingConfig;
  }

  abstract click: (selector: string, causesNavigation: boolean) => this;

  abstract hover: (selector: string, causesNavigation: boolean) => this;

  abstract load: (url: string) => this;

  abstract resize: (width: number, height: number) => this;

  abstract fill: (
    selector: string,
    value: string,
    causesNavigation: boolean
  ) => this;

  abstract type: (
    selector: string,
    value: string,
    causesNavigation: boolean
  ) => this;

  abstract keydown: (
    selector: string,
    key: string,
    causesNavigation: boolean
  ) => this;

  abstract select: (
    selector: string,
    key: string,
    causesNavigation: boolean
  ) => this;

  abstract wheel: (
    deltaX: number,
    deltaY: number,
    pageXOffset?: number,
    pageYOffset?: number
  ) => this;

  abstract dragAndDrop: (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
  ) => this;

  abstract fullScreenshot: () => this;

  abstract awaitText: (test: string) => this;

  abstract wait: (ms: number) => this;

  abstract buildScript: () => string;

  private transformActionIntoCodes = (actionContext: ActionContext) => {
    if (this.showComments) {
      const actionDescription = actionContext.getDescription();
      this.pushComments(`// ${actionDescription}`);
    }

    const bestSelector = actionContext.getBestSelector();
    const tagName = actionContext.getTagName();
    const value = actionContext.getValue();
    const inputType = actionContext.getInputType();
    const { causesNavigation } = actionContext.getActionState();
    // (FIXME: getters for special fields)
    const action: any = actionContext.getAction();

    switch (actionContext.getType()) {
      case ActionType.Click:
        this.click(bestSelector as string, causesNavigation);
        break;
      case ActionType.Hover:
        this.hover(bestSelector as string, causesNavigation);
        break;
      case ActionType.Keydown:
        this.keydown(
          bestSelector as string,
          action.key ?? '',
          causesNavigation
        );
        break;
      case ActionType.Input: {
        if (tagName === TagName.Select) {
          this.select(bestSelector as string, value ?? '', causesNavigation);
        } else if (
          // If the input is "fillable" or a text area
          tagName === TagName.Input &&
          inputType != null &&
          FILLABLE_INPUT_TYPES.includes(inputType)
        ) {
          // Do more actionability checks
          this.fill(bestSelector as string, value ?? '', causesNavigation);
        } else if (tagName === TagName.TextArea) {
          this.fill(bestSelector as string, value ?? '', causesNavigation);
        } else {
          this.type(bestSelector as string, value ?? '', causesNavigation);
        }
        break;
      }
      case ActionType.Load:
        this.load(action.url);
        break;
      case ActionType.Resize:
        this.resize(action.width, action.height);
        break;
      case ActionType.Wheel:
        this.wheel(
          action.deltaX,
          action.deltaY,
          action.pageXOffset,
          action.pageYOffset
        );
        break;
      case ActionType.FullScreenshot:
        this.fullScreenshot();
        break;
      case ActionType.AwaitText:
        this.awaitText(action.text);
        break;
      case ActionType.DragAndDrop:
        this.dragAndDrop(
          action.sourceX,
          action.sourceY,
          action.targetX,
          action.targetY
        );
        break;
      default:
        break;
    }
  };

  protected pushComments = (comments: string) => {
    this.codes.push(`\n  ${comments}`);
    return this;
  };

  protected pushCodes = (codes: string) => {
    this.codes.push(`\n  ${codes}\n`);
    return this;
  };

  pushActionContext = (actionContext: ActionContext) => {
    this.actionContexts.push(actionContext);
  };

  buildCodes = () => {
    let prevActionContext: ActionContext | undefined;
    let prevTimestamp: number | undefined;

    for (const actionContext of this.actionContexts) {
      const currentAction = actionContext.getAction();
      const currentTimestamp = currentAction.timestamp;

      // Adiciona wait entre ações se configurado e houver diferença significativa de tempo
      if (
        this.timingConfig.enableWaits &&
        prevTimestamp !== undefined &&
        currentTimestamp !== undefined
      ) {
        const timeDiff = currentTimestamp - prevTimestamp;
        // Apenas adiciona wait se o tempo for maior que minWaitMs
        if (
          timeDiff > this.timingConfig.minWaitMs &&
          timeDiff <= this.timingConfig.maxWaitMs
        ) {
          if (this.showComments) {
            this.pushComments(`// Wait ${timeDiff}ms`);
          }
          this.wait(timeDiff);
        } else if (timeDiff > this.timingConfig.maxWaitMs) {
          // Se o tempo for maior que maxWaitMs, limita ao máximo configurado
          if (this.showComments) {
            this.pushComments(
              `// Wait ${timeDiff}ms (truncated to ${this.timingConfig.maxWaitMs}ms)`
            );
          }
          this.wait(this.timingConfig.maxWaitMs);
        }
      }

      if (!actionContext.getActionState().isStateful) {
        if (
          prevActionContext !== undefined &&
          prevActionContext.getActionState().isStateful
        ) {
          this.transformActionIntoCodes(prevActionContext);
        }
        this.transformActionIntoCodes(actionContext);
      }

      prevActionContext = actionContext;
      prevTimestamp = currentTimestamp;
    }

    // edge case
    if (
      prevActionContext !== undefined &&
      prevActionContext.getActionState().isStateful
    ) {
      this.transformActionIntoCodes(prevActionContext);
    }
    return this;
  };

  // for test
  getLatestCode = () => this.codes[this.codes.length - 1];
}

export class CypressScriptBuilder extends ScriptBuilder {
  private templateRenderer: TemplateRenderer;

  constructor(
    showComments: boolean,
    timingConfig: TimingConfig = DEFAULT_TIMING_CONFIG
  ) {
    super(showComments, timingConfig);
    this.templateRenderer = createTemplateRenderer();
  }

  // Cypress automatically detects and waits for the page to finish loading
  click = (selector: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').click();`);
    return this;
  };

  hover = (selector: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').trigger('mouseover');`);
    return this;
  };

  load = (url: string) => {
    this.pushCodes(`cy.visit('${url}');`);
    return this;
  };

  resize = (width: number, height: number) => {
    this.pushCodes(`cy.viewport(${width}, ${height});`);
    return this;
  };

  fill = (selector: string, value: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').type(${JSON.stringify(value)});`);
    return this;
  };

  type = (selector: string, value: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').type(${JSON.stringify(value)});`);
    return this;
  };

  select = (selector: string, option: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').select('${option}');`);
    return this;
  };

  keydown = (selector: string, key: string, causesNavigation: boolean) => {
    this.pushCodes(`cy.get('${selector}').type('{${key}}');`);
    return this;
  };

  wheel = (
    deltaX: number,
    deltaY: number,
    pageXOffset?: number,
    pageYOffset?: number
  ) => {
    this.pushCodes(
      `cy.scrollTo(${Math.floor(pageXOffset ?? 0)}, ${Math.floor(
        pageYOffset ?? 0
      )});`
    );
    return this;
  };

  fullScreenshot = () => {
    this.pushCodes(`cy.screenshot();`);
    return this;
  };

  awaitText = (text: string) => {
    this.pushCodes(`cy.contains('${text}');`);
    return this;
  };

  dragAndDrop = (
    sourceX: number,
    sourceY: number,
    targetX: number,
    targetY: number
  ) => {
    // TODO -> IMPLEMENT ME
    this.pushCodes('');
    return this;
  };

  wait = (ms: number) => {
    this.pushCodes(`cy.wait(${ms});`);
    return this;
  };

  buildScript = () => {
    return `it('Written with Fleury Cypress Recorder', () => {${this.codes.join(
      ''
    )}});`;
  };

  /**
   * Retorna apenas os comandos Cypress sem o wrapper de teste
   * @returns Array de comandos Cypress
   */
  getCommands = (): string[] => {
    return this.codes;
  };

  /**
   * Constrói o script completo usando o TemplateRenderer
   * @param context - Contexto de exportação com informações do teste
   * @returns Script Cypress formatado com o novo template
   */
  buildScriptWithTemplate = (context: Partial<RecordingExportContext>): string => {
    const commands = this.getCommands();
    
    const fullContext: RecordingExportContext = {
      testName: context.testName || 'Teste Automatizado',
      url: context.url || '/',
      actions: context.actions || [],
      commands: commands,
      showComments: this.showComments,
      exportOptions: context.exportOptions || {
        viewportWidth: 1366,
        viewportHeight: 768
      }
    };

    return this.templateRenderer.render(fullContext);
  };
}

/**
 * Gera código de teste automatizado apenas para Cypress
 * @param actions - Array de ações capturadas
 * @param showComments - Se deve incluir comentários no código gerado
 * @param scriptType - Tipo de script (atualmente apenas Cypress é suportado)
 * @param timingConfig - Configuração de timing para waits entre ações
 * @returns Código Cypress formatado
 */
export const genCode = (
  actions: Action[],
  showComments: boolean,
  scriptType: ScriptType,
  timingConfig: TimingConfig = DEFAULT_TIMING_CONFIG
): string => {
  // Agora sempre usa CypressScriptBuilder
  const scriptBuilder = new CypressScriptBuilder(showComments, timingConfig);

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (!isSupportedActionType(action.type)) {
      continue;
    }

    const nextAction = actions[i + 1];
    const causesNavigation = nextAction?.type === ActionType.Navigate;

    scriptBuilder.pushActionContext(
      new ActionContext(action, ScriptType.Cypress, {
        causesNavigation,
        isStateful: isActionStateful(action),
      })
    );
  }

  return scriptBuilder.buildCodes().buildScript();
};

/**
 * Exporta uma função específica para gerar código Cypress
 * @param actions - Array de ações capturadas
 * @param showComments - Se deve incluir comentários no código gerado
 * @param timingConfig - Configuração de timing para waits entre ações
 * @returns Código Cypress formatado
 */
export const genCypressCode = (
  actions: Action[],
  showComments: boolean = true,
  timingConfig: TimingConfig = DEFAULT_TIMING_CONFIG
): string => {
  return genCode(actions, showComments, ScriptType.Cypress, timingConfig);
};

/**
 * Gera código Cypress usando o novo template com suporte a sizes
 * @param actions - Array de ações capturadas
 * @param context - Contexto de exportação com informações adicionais
 * @param showComments - Se deve incluir comentários no código gerado
 * @param timingConfig - Configuração de timing para waits entre ações
 * @returns Código Cypress formatado com o novo template
 */
export const genCypressCodeWithTemplate = (
  actions: Action[],
  context: Partial<RecordingExportContext> = {},
  showComments: boolean = true,
  timingConfig: TimingConfig = DEFAULT_TIMING_CONFIG
): string => {
  const scriptBuilder = new CypressScriptBuilder(showComments, timingConfig);

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (!isSupportedActionType(action.type)) {
      continue;
    }

    const nextAction = actions[i + 1];
    const causesNavigation = nextAction?.type === ActionType.Navigate;

    scriptBuilder.pushActionContext(
      new ActionContext(action, ScriptType.Cypress, {
        causesNavigation,
        isStateful: isActionStateful(action),
      })
    );
  }

  scriptBuilder.buildCodes();
  
  return scriptBuilder.buildScriptWithTemplate({
    ...context,
    actions
  });
};