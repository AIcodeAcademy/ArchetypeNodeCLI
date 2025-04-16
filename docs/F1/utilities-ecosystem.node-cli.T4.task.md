---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "T4 Implement logging utility functions for info, warn, error, and debug levels, with structured output, timestamps, and optional colored output using chalk."
status: "in_progress"
folder: "/docs/F1/"
file: "utilities-ecosystem.node-cli.T4.task.md"
---

# Programming Task: T4

Implement logging utility functions for info, warn, error, and debug levels, with structured output, timestamps, and optional colored output using chalk.
docs/F1/utilities-ecosystem.node-cli.plan.md

- Plan: [docs/F1/utilities-ecosystem.node-cli.plan.md](docs/F1/utilities-ecosystem.node-cli.plan.md)

## Context

- Use TypeScript, fully typed and annotated.
- Place related functions in module files.
- Export only what is needed outside the module.
- Use types defined in `logging.type.ts`.
- Use `chalk` for colored output.
- Feature: Utilities ecosystem
- Container: node-cli
- Task: T4
- Status: in_progress

## Instructions

`src/app/system/logging.util.ts`
 - Implement pure utility functions for logging at info, warn, error, and debug levels.
 - Output should be structured, include timestamps, and support colored output using `chalk`.
 - Use types from `logging.type.ts`.

- Ensure all functions are fully annotated and avoid magic numbers/strings.
- Export only what is needed for use by other modules.

## Output

- Change the status of the task to "in_progress", "done" or "failed" in this file.
- Mark this task as done in the docs/F1/utilities-ecosystem.node-cli.plan.md after completion.
- Summarize the work done and propose a git commit message in this file.

> End of programming instructions for this task.
