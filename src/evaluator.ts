import * as vm from 'node:vm';

import chroma from 'chroma-js';
import faker from 'faker';
import _ from 'lodash';

import type { EqualityConfig } from './config';

const HELP_TOKEN = Symbol('equality.help');

export interface EvaluationSuccess {
  kind: 'success';
  value: string;
}

export interface EvaluationHelp {
  kind: 'help';
  expression: string;
  message: string;
}

export interface EvaluationError {
  kind: 'error';
  expression: string;
  message: string;
}

export type EvaluationResult = EvaluationSuccess | EvaluationHelp | EvaluationError;

interface HelpSignal {
  token: typeof HELP_TOKEN;
  expression: string;
}

interface EvaluationContext {
  _: typeof _;
  c: typeof chroma;
  chroma: typeof chroma;
  e: Record<string, unknown>;
  f: typeof faker;
  faker: typeof faker;
  help: () => HelpSignal;
  hex: (r: number, g: number, b: number) => string;
  rand: (min?: number, max?: number) => number;
  rgb: (hexValue: string) => string | null;
}

function buildHelpSignal(expression: string): HelpSignal {
  return {
    token: HELP_TOKEN,
    expression,
  };
}

export function rand(min = 0, max = 100): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function rgb(hexValue: string): string | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const normalizedHex = hexValue.replace(shorthandRegex, (_match, r, g, b) => {
    return `${r}${r}${g}${g}${b}${b}`;
  });

  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);

  if (!match) {
    return null;
  }

  return `rgb(${parseInt(match[1], 16)},${parseInt(match[2], 16)},${parseInt(match[3], 16)})`;
}

export function hex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function createEvaluationContext(
  config: EqualityConfig,
  expression: string,
): EvaluationContext {
  faker.locale = config.fakerLocale;

  return {
    _,
    c: chroma,
    chroma,
    e: config.variables,
    f: faker,
    faker,
    help: () => buildHelpSignal(expression),
    hex,
    rand,
    rgb,
  };
}

function isHelpSignal(value: unknown): value is HelpSignal {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'token' in value &&
      (value as HelpSignal).token === HELP_TOKEN,
  );
}

function normalizeValue(value: unknown): EvaluationResult {
  if (isHelpSignal(value)) {
    return {
      kind: 'help',
      expression: value.expression,
      message: 'Select documentation to open',
    };
  }

  if (typeof value === 'undefined') {
    return {
      kind: 'error',
      expression: '',
      message: "The expression returned undefined.",
    };
  }

  return {
    kind: 'success',
    value: String(value),
  };
}

function runExpression(source: string, context: EvaluationContext): unknown {
  const script = new vm.Script(source);
  return script.runInNewContext(context, { timeout: 1000 });
}

export function evaluateExpression(
  expression: string,
  config: EqualityConfig,
): EvaluationResult {
  const trimmedExpression = expression.trim();
  const source = trimmedExpression.startsWith(config.symbol)
    ? trimmedExpression.slice(config.symbol.length)
    : trimmedExpression;

  const context = createEvaluationContext(config, trimmedExpression);

  try {
    let value = runExpression(source, context);

    if (typeof value === 'function') {
      value = value();
    }

    const normalized = normalizeValue(value);

    if (normalized.kind !== 'error') {
      return normalized;
    }

    return {
      ...normalized,
      expression: trimmedExpression,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "I can't evaluate this expression.";

    return {
      kind: 'error',
      expression: trimmedExpression,
      message,
    };
  }
}
