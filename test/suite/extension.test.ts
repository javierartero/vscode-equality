import * as assert from 'node:assert/strict';

import * as vscode from 'vscode';

suite('extension integration', function () {
  this.timeout(15000);

  setup(async () => {
    const extension = vscode.extensions.getExtension('javierartero.equality');
    await extension?.activate();
  });

  test('replaces the expression result in the active editor', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '=2+2',
      language: 'plaintext',
    });
    const editor = await vscode.window.showTextDocument(document);
    editor.selection = new vscode.Selection(0, 4, 0, 4);

    await vscode.commands.executeCommand('equality.evaluate');

    assert.equal(document.getText(), '4');
  });

  test('supports multiple cursors', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '=2+2\n=3+3',
      language: 'plaintext',
    });
    const editor = await vscode.window.showTextDocument(document);
    editor.selections = [
      new vscode.Selection(0, 4, 0, 4),
      new vscode.Selection(1, 4, 1, 4),
    ];

    await vscode.commands.executeCommand('equality.evaluate');

    assert.equal(document.getText(), '4\n6');
  });

  test('does not mutate the document when evaluation fails', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '=missingFunction()',
      language: 'plaintext',
    });
    const editor = await vscode.window.showTextDocument(document);
    editor.selection = new vscode.Selection(0, 18, 0, 18);

    await vscode.commands.executeCommand('equality.evaluate');

    assert.equal(document.getText(), '=missingFunction()');
  });
});
