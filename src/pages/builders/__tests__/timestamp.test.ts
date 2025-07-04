import { genCode } from '../index';
import { ActionType, ScriptType, Action } from '../../types';
import { TimingConfig } from '../../types/config';

describe('Timestamp functionality', () => {
  const mockActions: Action[] = [
    {
      type: ActionType.Click,
      tagName: 'BUTTON' as any,
      selectors: { generalSelector: 'button' },
      timestamp: 1000,
      value: undefined,
      isPassword: false,
      hasOnlyText: false,
      inputType: undefined,
    } as Action,
    {
      type: ActionType.Input,
      tagName: 'INPUT' as any,
      inputType: 'text',
      selectors: { generalSelector: 'input[name="username"]' },
      timestamp: 2500, // 1.5 segundos depois
      value: 'testuser',
      isPassword: false,
      hasOnlyText: false,
    } as Action,
    {
      type: ActionType.Click,
      tagName: 'BUTTON' as any,
      selectors: { generalSelector: 'button[type="submit"]' },
      timestamp: 5000, // 2.5 segundos depois
      value: undefined,
      isPassword: false,
      hasOnlyText: false,
      inputType: undefined,
    } as Action
  ];

  const timingConfig: TimingConfig = {
    enableWaits: true,
    maxWaitMs: 30000,
    minWaitMs: 20
  };

  test('should add wait commands between actions for Playwright', () => {
    const code = genCode(mockActions, true, ScriptType.Playwright, timingConfig);
    
    expect(code).toContain('// Wait 1500ms');
    expect(code).toContain('await page.waitForTimeout(1500);');
    expect(code).toContain('// Wait 2500ms');
    expect(code).toContain('await page.waitForTimeout(2500);');
  });

  test('should add wait commands between actions for Puppeteer', () => {
    const code = genCode(mockActions, true, ScriptType.Puppeteer, timingConfig);
    
    expect(code).toContain('// Wait 1500ms');
    expect(code).toContain('await page.waitForTimeout(1500);');
    expect(code).toContain('// Wait 2500ms');
    expect(code).toContain('await page.waitForTimeout(2500);');
  });

  test('should add wait commands between actions for Cypress', () => {
    const code = genCode(mockActions, true, ScriptType.Cypress, timingConfig);
    
    expect(code).toContain('// Wait 1500ms');
    expect(code).toContain('cy.wait(1500);');
    expect(code).toContain('// Wait 2500ms');
    expect(code).toContain('cy.wait(2500);');
  });

  test('should not add waits when disabled', () => {
    const disabledConfig: TimingConfig = {
      ...timingConfig,
      enableWaits: false
    };
    
    const code = genCode(mockActions, true, ScriptType.Playwright, disabledConfig);
    
    expect(code).not.toContain('waitForTimeout');
    expect(code).not.toContain('// Wait');
  });

  test('should truncate waits longer than maxWaitMs', () => {
    const longWaitActions: Action[] = [
      mockActions[0],
      {
        ...mockActions[1],
        timestamp: 40000 // 39 segundos depois
      } as Action
    ];
    
    const code = genCode(longWaitActions, true, ScriptType.Playwright, timingConfig);
    
    expect(code).toContain('// Wait 39000ms (truncated to 30000ms)');
    expect(code).toContain('await page.waitForTimeout(30000);');
  });

  test('should not add waits shorter than minWaitMs', () => {
    const quickActions: Action[] = [
      mockActions[0],
      {
        ...mockActions[1],
        timestamp: 1015 // apenas 15ms depois
      } as Action
    ];
    
    const code = genCode(quickActions, true, ScriptType.Playwright, timingConfig);
    
    expect(code).not.toContain('// Wait 15ms');
    expect(code).not.toContain('waitForTimeout(15)');
  });
});