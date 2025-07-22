/**
 * Factory para criar executors de ações
 */

import { Action, ActionType } from '../../../pages/types/index';
import { ActionExecutor } from './base';
import { ClickExecutor } from './click';
import { InputExecutor } from './input';
import { NavigateExecutor } from './navigate';
import { ResizeExecutor } from './resize';
import { ScreenshotExecutor } from './screenshot';
import { ScrollExecutor } from './scroll';
import { WheelExecutor } from './wheel';

export class ActionExecutorFactory {
  private executors: Map<ActionType, ActionExecutor> = new Map();

  constructor() {
    this.registerExecutors();
  }

  private registerExecutors(): void {
    this.executors.set(ActionType.Click, new ClickExecutor());
    this.executors.set(ActionType.Input, new InputExecutor());
    this.executors.set(ActionType.Navigate, new NavigateExecutor());
    this.executors.set(ActionType.Resize, new ResizeExecutor());
    this.executors.set(ActionType.FullScreenshot, new ScreenshotExecutor());
    this.executors.set(ActionType.Wheel, new ScrollExecutor());
  }

  public getExecutor(action: Action): ActionExecutor | null {
    // Para ações de scroll que usam Wheel
    if (action.type === ActionType.Wheel && 'x' in action && 'y' in action) {
      return this.executors.get(ActionType.Wheel) || null;
    }

    return this.executors.get(action.type) || null;
  }
}
