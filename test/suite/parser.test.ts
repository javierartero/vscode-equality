import * as assert from 'node:assert/strict';

import { parseLineForExpression } from '../../src/parser';

suite('parseLineForExpression', () => {
  test('extracts the expression from the configured symbol to the cursor', () => {
    const parsed = parseLineForExpression({
      lineText: 'const total = =2+2',
      cursorCharacter: 'const total = =2+2'.length,
      symbol: '=',
    });

    assert.deepEqual(parsed, {
      expression: '=2+2',
      startCharacter: 14,
      endCharacter: 18,
    });
  });

  test('supports custom symbols', () => {
    const parsed = parseLineForExpression({
      lineText: 'calc -> 2+2',
      cursorCharacter: 'calc -> 2+2'.length,
      symbol: '->',
    });

    assert.deepEqual(parsed, {
      expression: '-> 2+2',
      startCharacter: 5,
      endCharacter: 11,
    });
  });

  test('returns null when there is no expression after the symbol', () => {
    const parsed = parseLineForExpression({
      lineText: '=',
      cursorCharacter: 1,
      symbol: '=',
    });

    assert.equal(parsed, null);
  });

  test('returns null when the symbol is after the cursor', () => {
    const parsed = parseLineForExpression({
      lineText: '2+2 = later',
      cursorCharacter: 3,
      symbol: '=',
    });

    assert.equal(parsed, null);
  });
});
