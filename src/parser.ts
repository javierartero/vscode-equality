export interface ParsedExpression {
  expression: string;
  startCharacter: number;
  endCharacter: number;
}

export interface ParseLineInput {
  lineText: string;
  cursorCharacter: number;
  symbol: string;
}

export function parseLineForExpression({
  lineText,
  cursorCharacter,
  symbol,
}: ParseLineInput): ParsedExpression | null {
  if (!symbol) {
    return null;
  }

  const boundedCursor = Math.min(Math.max(cursorCharacter, 0), lineText.length);
  const visibleLine = lineText.slice(0, boundedCursor);
  const symbolIndex = visibleLine.lastIndexOf(symbol);

  if (symbolIndex === -1) {
    return null;
  }

  const expression = lineText.slice(symbolIndex, boundedCursor);

  if (expression.trim().length <= symbol.length) {
    return null;
  }

  return {
    expression,
    startCharacter: symbolIndex,
    endCharacter: boundedCursor,
  };
}
