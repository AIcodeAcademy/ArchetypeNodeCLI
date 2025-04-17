---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement console logger adapter using 'chalk'"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-3.task.md"
---

# Task 3 for Plan utilities-ecosystem-node-cli

Implement an adapter for console logging with colored output using the 'chalk' library.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)
- [chalk documentation](https://github.com/chalk/chalk)

## Instructions

<!--
  Create an adapter module for logging to the console.
  Install and use the 'chalk' library for adding colors.
-->

- `package.json`
  - Add `chalk` to dependencies.
- Terminal
  - Run `npm install` to install the new dependency.
- `src/system/logger.adapter.ts`
  - Create the file.
  - Import `chalk`: `import chalk from 'chalk';`
  - Define an enum `LogLevel` with values like `DEBUG`, `INFO`, `WARN`, `ERROR`.
  - Define a function `logToConsole(level: LogLevel, message: string, ...args: any[])`.
  - Inside the function:
    - Use a switch statement or mapping to apply different colors based on the `level` using `chalk` (e.g., `chalk.blue` for INFO, `chalk.yellow` for WARN, `chalk.red` for ERROR).
    - Format the message including the level and timestamp.
    - Use `console.log`, `console.warn`, `console.error` appropriately based on the level.
    - Include any additional `args` provided.
  - Ensure the function is fully typed using TypeScript.
  - Export `LogLevel` and `logToConsole`.

> End of programming instructions for task 3.
