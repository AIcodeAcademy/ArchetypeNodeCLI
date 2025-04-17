---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Define LogEntry type"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-7.task.md"
---

# Task 7 for Plan utilities-ecosystem-node-cli

Define the `LogEntry` domain type.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [Domain Model](/docs/domain-model.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)

## Instructions

<!--
  Define the structure for log entries within the domain.
-->

- `src/domain/logEntry.type.ts`
  - Create the file.
  - Import `LogLevel` from `logger.adapter.ts` or `system.type.ts`.
  - Define the `LogEntry` type based on the domain model (`timestamp`, `level`, `message`, `context?`, `source?`, `correlationId?`).
  - Use appropriate TypeScript types (e.g., `Date`, `LogLevel`, `string`, `Record<string, any>`).
  - Mark optional properties with `?`.
  - Export the `LogEntry` type.

> End of programming instructions for task 7.
