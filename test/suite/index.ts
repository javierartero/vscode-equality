import * as path from 'node:path';

import Mocha from 'mocha';

export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
    timeout: 15000,
  });

  const testsRoot = __dirname;
  const testFiles = [
    path.resolve(testsRoot, './parser.test.js'),
    path.resolve(testsRoot, './evaluator.test.js'),
    path.resolve(testsRoot, './extension.test.js'),
  ];

  for (const file of testFiles) {
    mocha.addFile(file);
  }

  await new Promise<void>((resolve, reject) => {
    mocha.run((failures) => {
      if (failures > 0) {
        reject(new Error(`${failures} tests failed.`));
        return;
      }
      resolve();
    });
  });
}
