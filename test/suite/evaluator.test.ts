import * as assert from 'node:assert/strict';

import { evaluateExpression, hex, rand, rgb } from '../../src/evaluator';

const config = {
  symbol: '=',
  variables: {
    plugin: 'equality',
    name: 'Javier Artero',
  },
  fakerLocale: 'en',
};

suite('evaluateExpression', () => {
  test('evaluates arithmetic expressions', () => {
    const result = evaluateExpression('=2+2', config);
    assert.deepEqual(result, { kind: 'success', value: '4' });
  });

  test('exposes custom variables through e', () => {
    const result = evaluateExpression('=e.name', config);
    assert.deepEqual(result, { kind: 'success', value: 'Javier Artero' });
  });

  test('supports helper functions', () => {
    const rgbResult = evaluateExpression("=rgb('#ff00aa')", config);
    const hexResult = evaluateExpression('=hex(255,0,170)', config);

    assert.deepEqual(rgbResult, { kind: 'success', value: 'rgb(255,0,170)' });
    assert.deepEqual(hexResult, { kind: 'success', value: '#ff00aa' });
  });

  test('supports lodash and chroma aliases', () => {
    const lodashResult = evaluateExpression("=_.camelCase('hello world')", config);
    const chromaResult = evaluateExpression("=c('white').hex()", config);

    assert.deepEqual(lodashResult, { kind: 'success', value: 'helloWorld' });
    assert.deepEqual(chromaResult, { kind: 'success', value: '#ffffff' });
  });

  test('returns help for the help function', () => {
    const result = evaluateExpression('=help', config);

    assert.deepEqual(result, {
      kind: 'help',
      expression: '=help',
      message: 'Select documentation to open',
    });
  });

  test('returns an error when the expression fails', () => {
    const result = evaluateExpression('=doesNotExist()', config);

    assert.equal(result.kind, 'error');
    assert.equal(result.expression, '=doesNotExist()');
  });
});

suite('helpers', () => {
  test('rand stays within bounds', () => {
    for (let index = 0; index < 20; index += 1) {
      const value = rand(5, 10);
      assert.ok(value >= 5);
      assert.ok(value <= 10);
    }
  });

  test('rgb expands shorthand hex values', () => {
    assert.equal(rgb('#f0a'), 'rgb(255,0,170)');
  });

  test('hex converts rgb channels to hex', () => {
    assert.equal(hex(255, 0, 170), '#ff00aa');
  });
});
