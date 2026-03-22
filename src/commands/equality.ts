import * as vscode from 'vscode';

import { getEqualityConfig } from '../config';
import { evaluateExpression } from '../evaluator';
import { showHelpPicker } from '../help';
import { parseLineForExpression } from '../parser';

interface Replacement {
  range: vscode.Range;
  value: string;
}

async function showOutcomeFeedback(message: string): Promise<void> {
  void vscode.window.showInformationMessage(message);
}

export async function runEqualityCommand(): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    await showOutcomeFeedback('Equality needs an active text editor.');
    return;
  }

  const config = getEqualityConfig();
  const replacements: Replacement[] = [];
  const helpRequests: Array<{ expression: string; message: string }> = [];
  const errors: Array<{ expression: string; message: string }> = [];

  for (const selection of editor.selections) {
    const line = editor.document.lineAt(selection.active.line);
    const parsed = parseLineForExpression({
      lineText: line.text,
      cursorCharacter: selection.active.character,
      symbol: config.symbol,
    });

    if (!parsed) {
      continue;
    }

    const evaluation = evaluateExpression(parsed.expression, config);

    if (evaluation.kind === 'success') {
      replacements.push({
        range: new vscode.Range(
          selection.active.line,
          parsed.startCharacter,
          selection.active.line,
          parsed.endCharacter,
        ),
        value: evaluation.value,
      });
      continue;
    }

    if (evaluation.kind === 'help') {
      helpRequests.push({
        expression: evaluation.expression,
        message: evaluation.message,
      });
      continue;
    }

    errors.push({
      expression: evaluation.expression,
      message: evaluation.message,
    });
  }

  if (replacements.length > 0) {
    await editor.edit((editBuilder) => {
      for (const replacement of replacements) {
        editBuilder.replace(replacement.range, replacement.value);
      }
    });
  }

  if (helpRequests.length > 0) {
    const request = helpRequests[0];
    void showHelpPicker(request.expression, config.symbol, request.message);
  } else if (errors.length > 0) {
    const failure = errors[0];
    void showHelpPicker(failure.expression, config.symbol, failure.message);
  }
}
