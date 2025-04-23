---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
task: "Implement Input Validation"
folder: "/containers/c1-node-cli/docs/f2/tasks"
file: "f2-2-input-validation.task.md"
---

# Task 2 for Plan f2-command-handling

Implement parameter type validation, required parameter checking, optional parameter handling, and custom validation rules support.

**Layer**: system  
**Status**: prompted

### Reference

- [Feature Blueprint](/docs/f2-command-handling.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f2/f2-command-handling.plan.md)
- [Language coding rules](/containers/c1-node-cli/.ai/rules/0-typescript.rules.md)  
- [Node CLI Archetype rules](/containers/c1-node-cli/.ai/rules/1-node-cli.rules.md)
- [System Layer rules](/containers/c1-node-cli/.ai/rules/2-system-layer.rules.md)

## Instructions

### Create Validator Interface

`src/system/command/validation/CommandValidator.ts`:
- Create interface `CommandValidator` with methods:
  - `validateParameters(params: ParameterMap, schema: ParameterSchema): ValidationResult`
  - `registerCustomRule(name: string, rule: ValidationRule): void`
  - `validateType(value: any, type: ParameterType): boolean`

### Implement Parameter Schema

`src/system/command/validation/ParameterSchema.ts`:
- Create class `ParameterSchema` to define parameter requirements:
  - Required/optional flags
  - Type definitions
  - Default values
  - Custom validation rules
  - Description and help text

### Create Validation Rules

`src/system/command/validation/rules/`:
- Implement base validation rules:
  - `RequiredRule`
  - `TypeRule`
  - `RangeRule`
  - `PatternRule`
- Create interface `ValidationRule` for custom rules
- Implement `CustomRule` for user-defined validation

### Add Tests

`src/system/command/validation/__tests__/CommandValidator.test.ts`:
- Test parameter validation
- Test custom rules
- Test type validation
- Test error cases

> End of programming instructions for task `f2-2`. 