# Change Log

## 0.8.0

- Modernized the extension toolchain to current TypeScript, linting and VS Code test infrastructure
- Refactored the command into parser, evaluator and help modules with explicit typing
- Isolated expression execution inside a controlled evaluation context
- Added real parser, evaluator and integration tests
- Updated the command id to `equality.evaluate` while keeping `extension.equality` as a compatibility alias

## 0.7.0

- Add [lodash](https://lodash.com/) library
- Fix help file

## 0.6.0

- Add [chroma](https://gka.github.io/chroma.js/) library
- Add alias to faker => `f`
- Add alias to chroma => `c`

## 0.5.1

- Add conversion methods from rgb to hexadecimal

## 0.5.0

- Add multi-selection support
- Add `rand(min, max)`

## 0.4.0

- Add help system with access to external documentation on errors
- Add `help`

## 0.3.1

- Fix configuration problems

## 0.3.0

- Add `equality.vars`

## 0.2.0

- Add faker
- Add `equality.symbol`
