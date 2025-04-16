---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "T2 Implement environment utility functions for retrieving and type-casting environment variables, supporting required/optional flags and default values."
status: "in_progress"
folder: "/docs/F1/"
file: "utilities-ecosystem.node-cli.T2.task.md"
---

# Programming Task: T2

Implement environment utility functions for retrieving and type-casting environment variables, supporting required/optional flags and default values.
docs/F1/utilities-ecosystem.node-cli.plan.md

- Plan: [docs/F1/utilities-ecosystem.node-cli.plan.md](docs/F1/utilities-ecosystem.node-cli.plan.md)

## Context

- Use TypeScript, fully typed and annotated.
- Place related functions in module files.
- Export only what is needed outside the module.
- Use types defined in `environment.type.ts`.
- Feature: Utilities ecosystem
- Container: node-cli
- Task: T2
- Status: in_progress

## Instructions

`src/app/system/environment.util.ts`
 - Implement pure utility functions to retrieve environment variables by key, with type-casting.
 - Support required/optional flags and default values.
 - Use early return to avoid nesting.
 - Prefer higher-order functions over loops.
 - Use types from `environment.type.ts`.

- Ensure all functions are fully annotated and avoid magic numbers/strings.
- Export only what is needed for use by other modules.

## Output

- Change the status of the task to "in_progress", "done" or "failed" in this file.
- Mark this task as done in the docs/F1/utilities-ecosystem.node-cli.plan.md after completion.
- Summarize the work done and propose a git commit message in this file.

> End of programming instructions for this task.
