---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement ConfigurationService using the adapter"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-9.task.md"
---

# Task 9 for Plan utilities-ecosystem-node-cli

Implement the `ConfigurationService` to load and provide validated configuration data.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)
- Task 2: Configuration Adapter (`src/system/configuration.adapter.ts`)
- Task 6: Configuration Type & Validation (`src/domain/configuration.type.ts`, `src/domain/configuration.validator.ts`)
- Task 8: Environment Service (`src/domain/environment.service.ts`)

## Instructions

<!--
  Create a domain service responsible for loading, validating, and providing access to the application configuration.
-->

- `src/domain/configuration.service.ts`
  - Create the file.
  - Import `readConfigurationFile` from `configuration.adapter.ts`.
  - Import `Configuration` type from `configuration.type.ts`.
  - Import `validateConfiguration` from `configuration.validator.ts`.
  - Import `EnvironmentService` (or its instance) from `environment.service.ts`.
  - Define a class `ConfigurationService`.
  - In the constructor (or an initialization method like `loadConfiguration`):
    - Get the configuration file path from `EnvironmentService`.
    - Use `readConfigurationFile` to read the raw configuration data.
    - If data is loaded successfully:
      - Call `validateConfiguration` to get the validated `Configuration` object.
      - Store the validated `Configuration` object in a private property (e.g., `this.configuration`).
    - Handle cases where the configuration file is not found or invalid (e.g., throw an error or use default values).
  - Add public getter methods to access specific configuration properties (e.g., `getSourceFolder(): string`, `getTargetFolder(): string`, `getGlobs(): string[]`).
  - Consider implementing it as a Singleton pattern.
  - Export the `ConfigurationService` instance (if Singleton) or the class itself.

> End of programming instructions for task 9.
