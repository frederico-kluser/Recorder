import {
  CypressScriptBuilder,
  truncateText,
} from '../src/pages/builders';

describe('Test builders', () => {
  test('truncateText', () => {
    expect(truncateText('hello', 10)).toBe('hello');
    expect(truncateText('hello', 2)).toBe('he...');
    expect(truncateText('hello', 0)).toBe('...');
  });

  describe('CypressScriptBuilder', () => {
    let builder: any;
    let mockPushCodes: any;

    beforeEach(() => {
      builder = new CypressScriptBuilder(true);
      mockPushCodes = jest.spyOn(builder, 'pushCodes').mockReturnValue(builder);
    });

    test('pushComments, pushCodes and build', () => {
      mockPushCodes.mockRestore();

      const output = builder
        .pushComments('// hello-world')
        .pushCodes('cy.visit();')
        .buildScript();
      expect(output).toBe(
        `it('Written with Fleury Cypress Recorder', () => {\n  // hello-world\n  cy.visit();\n});`
      );
    });

    test('click', () => {
      builder.click('selector', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        "cy.get('selector').click();"
      );
    });

    test('hover', () => {
      builder.hover('selector', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        "cy.get('selector').trigger('mouseover');"
      );
    });

    test('load', () => {
      builder.load('url');
      expect(mockPushCodes).toHaveBeenNthCalledWith(1, "cy.visit('url');");
    });

    test('resize', () => {
      builder.resize(1, 2);
      expect(mockPushCodes).toHaveBeenNthCalledWith(1, 'cy.viewport(1, 2);');
    });

    test('fill', () => {
      builder.fill('selector', 'value', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        'cy.get(\'selector\').type("value");'
      );
    });

    test('type', () => {
      builder.type('selector', 'value', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        'cy.get(\'selector\').type("value");'
      );
    });

    test('select', () => {
      builder.select('selector', 'option', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        "cy.get('selector').select('option');"
      );
    });

    test('keydown', () => {
      builder.keydown('selector', 'Enter', true);
      expect(mockPushCodes).toHaveBeenNthCalledWith(
        1,
        "cy.get('selector').type('{Enter}');"
      );
    });

    test('wheel', () => {
      builder.wheel(5, 6, 1, 2);
      expect(mockPushCodes).toHaveBeenNthCalledWith(1, 'cy.scrollTo(1, 2);');
    });

    test('fullScreenshot', () => {
      builder.fullScreenshot();
      expect(mockPushCodes).toHaveBeenNthCalledWith(1, 'cy.screenshot();');
    });

    test('awaitText', () => {
      builder.awaitText('text');
      expect(mockPushCodes).toHaveBeenNthCalledWith(1, "cy.contains('text');");
    });
  });
});
