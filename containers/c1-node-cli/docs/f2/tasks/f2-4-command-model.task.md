---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Command Model"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-4-command-model.task.md"
---

# Task 4 for Plan f2-command-handling

Implement command definition interface, parameter definition interface, command execution result model, and validation result model.

**Layer**: domain  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [Domain Layer rules](/containers/c1-node-cli/.ai/rules/3-domain-layer.rules.md)

## Instructions

### Create Command Interface

`src/domain/command/Command.ts`:
- Create interface `Command` with methods:
  - `execute(params: ParameterMap): Promise<CommandResult>`
  - `validate(params: ParameterMap): ValidationResult`
  - `getHelp(): CommandHelp`

### Implement Parameter Interface

`src/domain/command/Parameter.ts`:
- Create interface `Parameter` with properties:
  - `name: string`
  - `type: ParameterType`
  - `required: boolean`
  - `defaultValue?: any`
  - `description: string`
  - `validationRules: ValidationRule[]`

### Create Result Models

`src/domain/command/result/`:
- Create `CommandResult` class:
  - `success: boolean`
  - `data?: any`
  - `error?: CommandError`
  - `executionTime: number`
- Create `ValidationResult` class:
  - `valid: boolean`
  - `errors: ValidationError[]`
  - `warnings: ValidationWarning[]`

### Add Help Models

`src/domain/command/help/`:
- Create `CommandHelp` class:
  - `description: string`
  - `usage: string`
  - `examples: string[]`
  - `parameters: ParameterHelp[]`
  - `relatedCommands: string[]`

### Add Tests

`src/domain/command/__tests__/Command.test.ts`:
- Test command execution
- Test parameter validation
- Test result models
- Test help generation

> End of programming instructions for task `f2-4`. 