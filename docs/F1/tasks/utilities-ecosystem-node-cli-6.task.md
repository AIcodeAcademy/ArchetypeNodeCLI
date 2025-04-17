---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Define Configuration type and validation"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-6.task.md"
---

# Task 6 for Plan utilities-ecosystem-node-cli

Define the `Configuration` domain type and associated validation logic.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [Domain Model](/docs/domain-model.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Define the structure of the Configuration data loaded from the file and how to validate it.
-->

- `src/domain/configuration.type.ts`
  - Create the file.
  - Define the `Configuration` type based on the domain model (`sourceFolder`, `targetFolder`, `globs`, `filePath?`, `environment?`).
  - Use appropriate TypeScript types (e.g., `string`, `string[]`, `Environment` from `environment.type.ts`).
  - Mark optional properties with `?`.
  - Export the `Configuration` type.

- `src/domain/configuration.validator.ts`
  - Create the file.
  - Import the `Configuration` type.
  - Define a function `validateConfiguration(config: Partial<Configuration>): Configuration`.
  - This function should:
    - Take a potentially incomplete configuration object.
    - Check for required fields (`sourceFolder`, `targetFolder`, `globs`). Throw an error if missing or empty.
    - Provide default values for optional fields if needed.
    - Perform any other necessary validation (e.g., check if paths are valid strings).
    - Return the validated `Configuration` object.
  - Export the `validateConfiguration` function.

> End of programming instructions for task 6.
