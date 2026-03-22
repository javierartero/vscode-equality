import * as vscode from 'vscode';

import { runEqualityCommand } from './commands/equality';

const COMMANDS = ['equality.evaluate', 'extension.equality'] as const;

export function activate(context: vscode.ExtensionContext): void {
  for (const command of COMMANDS) {
    context.subscriptions.push(vscode.commands.registerCommand(command, runEqualityCommand));
  }
}

export function deactivate(): void {
  // Nothing to dispose explicitly.
}
