import * as vscode from 'vscode';

export interface EqualityConfig {
  symbol: string;
  variables: Record<string, unknown>;
  fakerLocale: string;
}

const DEFAULT_VARIABLES: Record<string, unknown> = {
  plugin: 'equality',
};

export function getEqualityConfig(): EqualityConfig {
  const configuration = vscode.workspace.getConfiguration();
  const symbol = configuration.get<string>('equality.symbol', '=');
  const variables = configuration.get<Record<string, unknown>>(
    'equality.vars',
    DEFAULT_VARIABLES,
  );
  const fakerLocale = configuration.get<string>('faker.locale', 'en');

  return {
    symbol,
    variables,
    fakerLocale,
  };
}
