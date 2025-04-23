---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Command Parser"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-1-command-parser.task.md"
---

# Task 1 for Plan f2-command-handling

Implement the command line argument parser with support for required and optional parameters, case-insensitive command matching, and command alias resolution.

**Layer**: system  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [System Layer rules](/containers/c1-node-cli/.ai/rules/2-system-layer.rules.md)

## Instructions

### Create Command Parser Interface

`src/system/command/parser/CommandParser.ts`:
- Create interface `CommandParser` with methods:
  - `parse(args: string[]): ParsedCommand`
  - `validate(parsed: ParsedCommand): ValidationResult`
  - `resolveAlias(command: string): string`

### Implement Command Parser

`src/system/command/parser/DefaultCommandParser.ts`:
- Create class `DefaultCommandParser` implementing `CommandParser`
- Implement command parsing logic:
  - Split args into command and parameters
  - Handle case-insensitive command matching
  - Support command aliases
  - Parse parameters into key-value pairs
- Implement validation:
  - Check required parameters
  - Validate parameter types
  - Return validation results
- Implement alias resolution:
  - Maintain internal alias map
  - Resolve command aliases to canonical names

### Create Types and Models

`src/system/command/parser/types.ts`:
- Define types:
  - `ParsedCommand`
  - `ValidationResult`
  - `ParameterValue`
  - `CommandAliasMap`

### Add Tests

`src/system/command/parser/__tests__/CommandParser.test.ts`:
- Test command parsing
- Test parameter validation
- Test alias resolution
- Test error cases

> End of programming instructions for task `f2-1`. 