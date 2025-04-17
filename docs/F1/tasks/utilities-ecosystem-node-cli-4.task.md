---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Define basic system interaction types"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-4.task.md"
---

# Task 4 for Plan utilities-ecosystem-node-cli

Define basic TypeScript types for system-level interactions related to environment, configuration, and logging adapters.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Create a type definition file for system-level interfaces or types used by the adapters.
  This promotes consistency and clarity.
-->

- `src/system/system.type.ts`
  - Create the file.
  - Define an interface `IEnvironmentReader` with a method signature matching `getEnvironmentVariable` from Task 1: `get(name: string): string | undefined;`.
  - Define an interface `IConfigurationReader` with a method signature matching `readConfigurationFile` from Task 2: `read<T>(filePath: string): T | undefined;`.
  - Define an interface `ILogger` with a method signature matching `logToConsole` from Task 3: `log(level: LogLevel, message: string, ...args: any[]): void;` (ensure `LogLevel` is imported or defined here if not already globally available).
  - Export all defined interfaces and the `LogLevel` enum (if defined here).

> End of programming instructions for task 4.
