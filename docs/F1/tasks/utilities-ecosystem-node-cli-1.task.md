---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement environment variable reader adapter"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-1.task.md"
---

# Task 1 for Plan utilities-ecosystem-node-cli

Implement an adapter to read environment variables using Node.js `process.env`.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Create an adapter module to encapsulate direct access to Node.js `process.env`.
-->

- `src/system/environment.adapter.ts`
  - Create the file.
  - Define a function `getEnvironmentVariable(name: string): string | undefined` that takes a variable name and returns its value from `process.env` or `undefined` if not found.
  - Ensure the function is fully typed using TypeScript.
  - Export the `getEnvironmentVariable` function.

> End of programming instructions for task 1.
