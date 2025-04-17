---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement LoggerService using the adapter"
folder: "/docs/F1/tasks"
file: "utilities-ecosystem-node-cli-10.task.md"
---

# Task 10 for Plan utilities-ecosystem-node-cli

Implement the `LoggerService` to provide a structured logging interface.

**Status**: not started

### Reference

- [Implementation Plan](/docs/F1/utilities-ecosystem-node-cli.plan.md)
- [Feature Blueprint](/docs/F1/utilities-ecosystem.blueprint.md)
- [General coding rules](/.ai/builder/rules/code.rules.md)
- [Node CLI archetype rules](/.ai/builder/rules/node-cli.rules.md)
- Task 3: Logger Adapter (`src/system/logger.adapter.ts`)
- Task 7: LogEntry Type (`src/domain/logEntry.type.ts`)
- Task 8: Environment Service (`src/domain/environment.service.ts`)

## Instructions

<!--
  Create a domain service for logging that uses the logger adapter and adheres to the LogEntry structure.
-->

- `src/domain/logger.service.ts`
  - Create the file.
  - Import `logToConsole`, `LogLevel` from `logger.adapter.ts`.
  - Import `LogEntry` from `logEntry.type.ts`.
  - Import `EnvironmentService` (or its instance) from `environment.service.ts`.
  - Define a class `LoggerService`.
  - In the constructor:
    - Get the configured log level from `EnvironmentService`.
    - Store the minimum log level in a private property.
  - Define methods for different log levels (e.g., `debug(message: string, context?: Record<string, any>)`, `info(message: string, context?: Record<string, any>)`, `warn(...)`, `error(...)`).
  - Inside each method:
    - Check if the method's level is >= the configured minimum log level.
    - If yes:
      - Create a `LogEntry` object with timestamp, level, message, and context.
      - Call the `logToConsole` adapter function, passing the level and formatted message (potentially including context).
  - Consider implementing it as a Singleton pattern.
  - Export the `LoggerService` instance (if Singleton) or the class itself.

> End of programming instructions for task 10.
