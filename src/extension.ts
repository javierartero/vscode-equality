'use strict';

import * as vscode from 'vscode';

import * as chroma from 'chroma-js';
import * as faker from 'faker';
import * as lodash from 'lodash';

import { Help } from './help';

const config = vscode.workspace.getConfiguration(),
  e = config.get('equality.vars'),
  equal = String(config.get('equality.symbol')),
  _ = lodash,
  f = faker,
  c = chroma;

faker.locale = String(config.get('faker.locale'));

export function activate() {
  vscode.commands.registerCommand('extension.equality', equality);
}

function equality() {
  const editor = vscode.window.activeTextEditor;

  editor.edit(edit => {
    for (let selection of editor.selections) {
      let position = selection.active,
        lineText = editor.document.lineAt(selection.end.line).text,
        result,
        equalPosition = lineText.lastIndexOf(equal);

      if (equalPosition > -1) {
        let contentSelection = new vscode.Selection(
            position.line,
            equalPosition,
            position.line,
            position.character
          ),
          contentText = editor.document.getText(contentSelection);

        if (contentText.length > 3) {
          result = evaluate(contentText);
          edit.replace(contentSelection, String(result));
        }
      }
    }
  });

  return '😎 Hi neo welcome to matrix';
}

function evaluate(str) {
  try {
    let evalue = eval(str.substr(1));
    if (typeof evalue == 'function') {
      evalue = eval(str.replace(/\s/g, '').substr(1) + '()');
    }
    if (typeof evalue == 'undefined') {
      let help = new Help(str, "I can't evaluate this 😅");
      return false;
    }
    return evalue;
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.warn(e.message);
    }
    let help = new Help(str, "I can't evaluate this 😅");
    return false;
  }
}

let help = () => {
  new Help('all');
  return false;
};

let rand = (min: number = 0, max: number = 100) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let rgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? 'rgb(' +
        parseInt(result[1], 16) +
        ',' +
        parseInt(result[2], 16) +
        ',' +
        parseInt(result[3], 16) +
        ')'
    : null;
};

let hex = (r: number, g: number, b: number) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export function deactivate() {
  console.log('OPS, your extension "EQUALITY" is not active!');
}
