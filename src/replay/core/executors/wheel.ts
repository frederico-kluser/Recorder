/**
 * Executor para ações de wheel (scroll do mouse)
 */

import { WheelAction } from '../../../pages/types/index';
import { ActionExecutor, ExecutorOptions } from './base';

export class WheelExecutor extends ActionExecutor {
  async execute(action: WheelAction, options?: ExecutorOptions): Promise<void> {
    const { selector, deltaX, deltaY } = action;

    try {
      let targetElement: Element;

      if (selector) {
        targetElement = await this.waitForElement(selector);
        this.scrollToElement(targetElement, options);
      } else {
        targetElement = document.body;
      }

      // Criar e disparar evento de wheel
      const wheelEvent = new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        view: window,
        deltaX,
        deltaY,
        deltaMode: WheelEvent.DOM_DELTA_PIXEL,
      });

      targetElement.dispatchEvent(wheelEvent);

      console.log(
        `[WheelExecutor] Wheel event on ${
          selector || 'body'
        }: deltaX=${deltaX}, deltaY=${deltaY}`
      );

      // Aguardar o efeito do wheel
      await this.delay(300);

      // Capture screenshot after wheel action
      await this.captureAfter(action);
    } catch (error) {
      throw new Error(`Failed to perform wheel action: ${error}`);
    }
  }
}
