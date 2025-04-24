# Prompts for implementing the f3-command-management plan at c1-node-cli

Implementation of a robust command system with argument parsing, help generation, and options support for the Node.js CLI application.

### Reference

- [Feature Blueprint](/docs/f3-command-management.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f3/f3-command-management.plan.md)
- [Architecture rules](/containers/c1-node-cli/.ai/layered.architecture.rules.md)
- [Archetype rules](/containers/c1-node-cli/.ai/node-cli.archetype.rules.md)
- [Language rules](/containers/c1-node-cli/.ai/typescript.language.rules.md)

## Instructions

### 1. Command Registration System
- Create `src/application/commands/command.registry.ts` with a class that manages command registration and discovery
- Implement command discovery in `src/application/commands/command.discovery.ts` to scan for command files
- Add decorators in `src/application/commands/command.decorators.ts` for command registration
- Create help text generation in `src/application/commands/command.help.ts`

### 2. Command Interface
- Define base command interface in `src/application/commands/command.interface.ts`
- Create command factory in `src/application/commands/command.factory.ts`
- Implement execution pipeline in `src/application/commands/command.pipeline.ts`
- Add validation middleware in `src/application/commands/command.middleware.ts`

### 3. CLI Interface
- Implement argument parsing in `src/application/cli/argument.parser.ts`
- Add option handling in `src/application/cli/option.handler.ts`
- Create help command in `src/application/cli/help.command.ts`
- Implement execution flow in `src/application/cli/execution.flow.ts`

### 4. Command Models
- Define metadata structure in `src/domain/models/command.metadata.ts`
- Create option and argument models in `src/domain/models/command.option.ts` and `src/domain/models/command.argument.ts`
- Implement validation rules in `src/domain/models/command.validation.ts`
- Define result types in `src/domain/models/command.result.ts`

### 5. Command Services
- Create validation service in `src/domain/services/command.validator.ts`
- Implement argument parsing service in `src/domain/services/argument.parser.ts`
- Add help text generation service in `src/domain/services/help.generator.ts`
- Create execution service in `src/domain/services/command.executor.ts`

### 6. Command Infrastructure
- Implement file system adapter in `src/system/adapters/command.filesystem.ts`
- Create metadata repository in `src/system/repositories/command.metadata.repository.ts`
- Add configuration types in `src/system/types/command.config.ts`
- Implement error types in `src/system/types/command.error.ts`

### 7. Utilities
- Create argument parser in `src/system/utils/argument.parser.ts`
- Implement option validator in `src/system/utils/option.validator.ts`
- Add help formatter in `src/system/utils/help.formatter.ts`
- Create execution utilities in `src/system/utils/command.executor.ts`

> End of programming instructions for feature plan `f3-command-management` at `c1-node-cli`. 