---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Define Environment type and validation"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-5.task.md"
---

# Task 5 for Plan utilities-ecosystem-node-cli

Define the `Environment` domain type and associated validation logic.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [Domain Model](/docs/domain-model.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Define the structure of the Environment data and how to validate it.
  Use a dedicated type file and a validator file.
-->

- `src/domain/environment.type.ts`
  - Create the file.
  - Define the `Environment` type based on the domain model (`configFilePath`, `logLevel`, `prefix?`, `nodeEnv?`).
  - Use appropriate TypeScript types (e.g., `string`, `LogLevel` enum from `logger.adapter.ts` or `system.type.ts`).
  - Mark optional properties with `?`.
  - Export the `Environment` type.

- `src/domain/environment.validator.ts`
  - Create the file.
  - Import the `Environment` type.
  - Define a function `validateEnvironment(env: Partial<Environment>): Environment`.
  - This function should:
    - Take a potentially incomplete environment object.
    - Check for required fields (`configFilePath`, `logLevel`). Throw an error if missing.
    - Provide default values for optional fields if not present (e.g., `prefix`, `nodeEnv`).
    - Validate the `logLevel` against the `LogLevel` enum values. Throw an error if invalid.
    - Return the validated and potentially defaulted `Environment` object.
  - Export the `validateEnvironment` function.

> End of programming instructions for task 5.
