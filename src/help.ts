import * as vscode from 'vscode';

export interface HelpTopic {
  key: string;
  label: string;
  url: string;
}

export interface HelpPickItem extends vscode.QuickPickItem {
  topic: HelpTopic;
}

export function getHelpTopics(symbol: string): HelpTopic[] {
  return [
    {
      key: 'vscode',
      label: 'VS Code extension API documentation',
      url: 'https://code.visualstudio.com/api',
    },
    {
      key: '_',
      label: 'Lodash documentation',
      url: 'https://lodash.com/docs/',
    },
    {
      key: 'chroma',
      label: 'Chroma.js documentation',
      url: 'https://gka.github.io/chroma.js/',
    },
    {
      key: 'faker',
      label: 'Faker documentation',
      url: 'https://github.com/Marak/Faker.js/',
    },
    {
      key: `${symbol}e.`,
      label: 'Equality custom variables',
      url: 'https://github.com/javierartero/vscode-equality#custom-variables',
    },
    {
      key: 'rand',
      label: 'Equality rand helper',
      url: 'https://github.com/javierartero/vscode-equality#helpers',
    },
    {
      key: 'rgb',
      label: 'Equality rgb helper',
      url: 'https://github.com/javierartero/vscode-equality#helpers',
    },
    {
      key: 'hex',
      label: 'Equality hex helper',
      url: 'https://github.com/javierartero/vscode-equality#helpers',
    },
    {
      key: symbol,
      label: 'Equality extension documentation',
      url: 'https://github.com/javierartero/vscode-equality',
    },
  ];
}

export function resolveHelpTopics(expression: string, symbol: string): HelpTopic[] {
  const normalizedExpression = expression.trim();
  const allTopics = getHelpTopics(symbol);

  if (normalizedExpression === 'all') {
    return [...allTopics];
  }

  return allTopics.filter((topic) => normalizedExpression.includes(topic.key));
}

export async function showHelpPicker(
  expression: string,
  symbol: string,
  placeholder: string,
): Promise<void> {
  const topics = resolveHelpTopics(expression, symbol);

  if (topics.length === 0) {
    void vscode.window.showInformationMessage(placeholder);
    return;
  }

  const items: HelpPickItem[] = topics.map((topic) => ({
    label: topic.label,
    description: topic.url,
    topic,
  }));

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: placeholder,
    matchOnDescription: true,
  });

  if (!selected) {
    return;
  }

  await vscode.env.openExternal(vscode.Uri.parse(selected.topic.url));
}
