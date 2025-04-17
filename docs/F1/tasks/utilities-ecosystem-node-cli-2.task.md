---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement configuration file reader adapter"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-2.task.md"
---

# Task 2 for Plan utilities-ecosystem-node-cli

Implement an adapter to read configuration files in JSON format.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Create an adapter module to handle reading and parsing JSON configuration files.
  Use Node.js built-in `fs` module for file system operations.
-->

- `src/system/configuration.adapter.ts`
  - Create the file.
  - Import the `fs` module: `import * as fs from 'fs';`
  - Define a function `readConfigurationFile<T>(filePath: string): T | undefined` that takes a file path.
  - Inside the function:
    - Check if the file exists using `fs.existsSync`.
    - If it exists, read the file content using `fs.readFileSync` with `utf-8` encoding.
    - Parse the JSON content using `JSON.parse`. Handle potential parsing errors with a try-catch block.
    - Return the parsed object or `undefined` if the file doesn't exist or parsing fails.
  - Ensure the function is generic and fully typed using TypeScript.
  - Export the `readConfigurationFile` function.

> End of programming instructions for task 2.
