---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement EnvironmentService using the adapter"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-8.task.md"
---

# Task 8 for Plan utilities-ecosystem-node-cli

Implement the `EnvironmentService` to provide access to validated environment variables.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)
- Task 1: Environment Adapter (`src/system/environment.adapter.ts`)
- Task 5: Environment Type & Validation (`src/domain/environment.type.ts`, `src/domain/environment.validator.ts`)

## Instructions

<!--
  Create a domain service that uses the environment adapter and validator.
  This service will be the primary way the application interacts with environment variables.
-->

- `src/domain/environment.service.ts`
  - Create the file.
  - Import `getEnvironmentVariable` from `environment.adapter.ts`.
  - Import `Environment` type from `environment.type.ts`.
  - Import `validateEnvironment` from `environment.validator.ts`.
  - Define a class `EnvironmentService`.
  - In the constructor:
    - Read all required environment variables using `getEnvironmentVariable` (e.g., `CONFIG_FILE_PATH`, `LOG_LEVEL`).
    - Create a partial `Environment` object.
    - Call `validateEnvironment` to get the validated `Environment` object.
    - Store the validated `Environment` object in a private property (e.g., `this.environment`).
  - Add public getter methods to access specific validated environment properties (e.g., `getConfigFilePath(): string`, `getLogLevel(): LogLevel`).
  - Consider implementing it as a Singleton pattern to ensure only one instance reads and validates the environment.
  - Export the `EnvironmentService` instance (if Singleton) or the class itself.

> End of programming instructions for task 8.
