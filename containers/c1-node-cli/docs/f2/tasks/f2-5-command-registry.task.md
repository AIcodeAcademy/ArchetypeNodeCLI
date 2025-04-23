---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Command Registry"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-5-command-registry.task.md"
---

# Task 5 for Plan f2-command-handling

Implement command registration system, command lookup functionality, command metadata management, and alias management.

**Layer**: domain  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [Domain Layer rules](/containers/c1-node-cli/.ai/rules/3-domain-layer.rules.md)

## Instructions

### Create Registry Interface

`src/domain/command/registry/CommandRegistry.ts`:
- Create interface `CommandRegistry` with methods:
  - `register(command: Command): void`
  - `unregister(commandName: string): void`
  - `getCommand(commandName: string): Command | undefined`
  - `getAllCommands(): Command[]`
  - `addAlias(commandName: string, alias: string): void`
  - `removeAlias(alias: string): void`

### Implement Registry

`src/domain/command/registry/DefaultCommandRegistry.ts`:
- Create class implementing `CommandRegistry`
- Implement command storage:
  - Use Map for command lookup
  - Support command metadata
  - Handle command aliases
  - Manage command lifecycle

### Create Metadata Models

`src/domain/command/registry/metadata/`:
- Create `CommandMetadata` class:
  - `name: string`
  - `aliases: string[]`
  - `category: string`
  - `version: string`
  - `dependencies: string[]`
  - `tags: string[]`

### Add Registry Utilities

`src/domain/command/registry/utils/`:
- Create command discovery utilities
- Add metadata management utilities
- Implement alias resolution utilities
- Create command validation utilities

### Add Tests

`src/domain/command/registry/__tests__/CommandRegistry.test.ts`:
- Test command registration
- Test command lookup
- Test alias management
- Test metadata handling

> End of programming instructions for task `f2-5`. 