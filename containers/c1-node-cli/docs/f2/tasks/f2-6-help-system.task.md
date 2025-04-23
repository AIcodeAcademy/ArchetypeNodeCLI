---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Help System"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-6-help-system.task.md"
---

# Task 6 for Plan f2-command-handling

Implement command documentation structure, help text generation, usage examples formatting, and related commands linking.

**Layer**: domain  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [Domain Layer rules](/containers/c1-node-cli/.ai/rules/3-domain-layer.rules.md)

## Instructions

### Create Help Interface

`src/domain/command/help/CommandHelpProvider.ts`:
- Create interface `CommandHelpProvider` with methods:
  - `getCommandHelp(commandName: string): CommandHelp`
  - `getCommandList(): CommandList`
  - `getCommandUsage(commandName: string): string`
  - `getCommandExamples(commandName: string): string[]`

### Implement Help Provider

`src/domain/command/help/DefaultCommandHelpProvider.ts`:
- Create class implementing `CommandHelpProvider`
- Implement help generation:
  - Format command descriptions
  - Generate usage examples
  - Create parameter documentation
  - Link related commands

### Create Help Models

`src/domain/command/help/models/`:
- Create `CommandList` class:
  - `commands: CommandSummary[]`
  - `categories: CategorySummary[]`
  - `search(query: string): CommandSummary[]`
- Create `CommandSummary` class:
  - `name: string`
  - `description: string`
  - `category: string`
  - `aliases: string[]`

### Add Help Utilities

`src/domain/command/help/utils/`:
- Create help text formatters
- Add example generators
- Implement command linking utilities
- Create search utilities

### Add Tests

`src/domain/command/help/__tests__/CommandHelpProvider.test.ts`:
- Test help generation
- Test command listing
- Test usage formatting
- Test example generation

> End of programming instructions for task `f2-6`. 