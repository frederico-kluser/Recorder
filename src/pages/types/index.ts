export enum ActionsMode {
  Actions = 'actions',
  Code = 'code',
}

export enum BarPosition {
  Top = 'top',
  Bottom = 'bottom',
}

export enum ScriptType {
  Cypress = 'cypress',
}

export enum ActionType {
  AwaitText = 'awaitText',
  Click = 'click',
  DragAndDrop = 'dragAndDrop',
  FullScreenshot = 'fullScreenshot',
  Hover = 'hover',
  Input = 'input',
  Keydown = 'keydown',
  Load = 'load',
  Navigate = 'navigate',
  Resize = 'resize',
  Wheel = 'wheel',
}

export enum TagName {
  A = 'A',
  B = 'B',
  Cite = 'CITE',
  EM = 'EM',
  Input = 'INPUT',
  Select = 'SELECT',
  Span = 'SPAN',
  Strong = 'STRONG',
  TextArea = 'TEXTAREA',
}

// (TODO) -> move to utils
export const isSupportedActionType = (actionType: any) => {
  return [
    ActionType.AwaitText,
    ActionType.Click,
    ActionType.DragAndDrop,
    ActionType.FullScreenshot,
    ActionType.Hover,
    ActionType.Input,
    ActionType.Keydown,
    ActionType.Load,
    ActionType.Resize,
    ActionType.Wheel,
  ].includes(actionType);
};

export class BaseAction {
  type: ActionType;
  tagName: TagName;
  inputType: string | undefined;
  value: string | undefined;
  selectors: { [key: string]: string | null };
  timestamp: number;
  isPassword: boolean;
  hasOnlyText: boolean; // If the element only has text content inside (hint to use text selector)
}

export class KeydownAction extends BaseAction {
  type: ActionType.Keydown;
  key: string;
}

export class InputAction extends BaseAction {
  type: ActionType.Input;
}

export class ClickAction extends BaseAction {
  type: ActionType.Click;
  x?: number;
  y?: number;
  selector: string;
}

export class DragAndDropAction extends BaseAction {
  type: ActionType.DragAndDrop;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export class HoverAction extends BaseAction {
  type: ActionType.Hover;
}

export class LoadAction extends BaseAction {
  type: ActionType.Load;
  url: string;
}

export class NavigateAction extends BaseAction {
  type: ActionType.Navigate;
  url: string;
  source?: string;
}

export class WheelAction extends BaseAction {
  type: ActionType.Wheel;
  deltaX: number;
  deltaY: number;
  pageXOffset?: number;
  pageYOffset?: number;
  selector?: string;
}

export class FullScreenshotAction extends BaseAction {
  type: ActionType.FullScreenshot;
}

export class AwaitTextAction extends BaseAction {
  type: ActionType.AwaitText;
  text: string;
}

export class ScreenshotAction extends BaseAction {
  type: ActionType.FullScreenshot;
}

export class ScrollAction extends BaseAction {
  type: ActionType.Wheel;
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
}

export class ResizeAction extends BaseAction {
  type: ActionType.Resize;
  width: number;
  height: number;
}

export type Action =
  | KeydownAction
  | InputAction
  | ClickAction
  | DragAndDropAction
  | HoverAction
  | LoadAction
  | NavigateAction
  | WheelAction
  | FullScreenshotAction
  | AwaitTextAction
  | ResizeAction
  | ScreenshotAction
  | ScrollAction;
