---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Help Command"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-8-help-command.task.md"
---

# Task 8 for Plan f2-command-handling

Implement help command with command list generation, detailed command help, and usage examples display.

**Layer**: application  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [Application Layer rules](/containers/c1-node-cli/.ai/rules/4-application-layer.rules.md)

## Instructions

### Create Help Command

`src/application/command/help/HelpCommand.ts`:
- Create class implementing `Command` interface
- Implement command execution:
  - List all commands
  - Show detailed help for specific command
  - Display usage examples
  - Show related commands

### Add Help Parameters

`src/application/command/help/HelpParameters.ts`:
- Create parameter definitions:
  - `commandName?: string` (optional)
  - `category?: string` (optional)
  - `search?: string` (optional)
  - `format?: 'text' | 'json'` (optional)

### Implement Help Display

`src/application/command/help/display/`:
- Create text formatters:
  - `CommandListFormatter`
  - `CommandHelpFormatter`
  - `ExampleFormatter`
- Create JSON formatters for API usage

### Add Help Tests

`src/application/command/help/__tests__/HelpCommand.test.ts`:
- Test command listing
- Test detailed help
- Test example display
- Test parameter handling

> End of programming instructions for task `f2-8`. 