---
syntax: "[Template Syntax](/.ai/syntax.template.md)"
feature: "Project Initialization"
folder: "/containers/c1-node-cli/docs/f1/"
file: "f1-project-initialization.prompt.md"
---

# Prompts for implement the feature f1-project-initialization plan at c1-node-cli

This feature implements a standardized way to create new Node.js CLI projects with best practices and consistent structure.

### Reference

- [Feature Blueprint](/docs/f1-project-initialization.blueprint.md)
- [Implementation Plan](/containers/c1-node-cli/docs/f1/f1-project-initialization.plan.md)
- [Architecture rules](/.ai/layered.architecture.rules.md)
- [Archetype rules](/.ai/node-cli.archetype.rules.md)
- [Language rules](/.ai/typescript.language.rules.md)

## Instructions

### Command Setup
- Create `src/application/commands/init.command.ts` with InitCommand class implementing Commander interface
- Add command options for project name, target directory, template, and force flag
- Implement interactive prompts using inquirer for project configuration
- Add progress indicators using ora for operation feedback
- Create command tests in `src/application/commands/__tests__/init.command.test.ts`

### Project Structure Generator
- Create `src/application/generators/project.generator.ts` with ProjectGenerator class
- Implement directory structure creation using FileSystem service
- Add template system integration with TemplateEngine
- Create configuration file generation logic
- Add generator tests in `src/application/generators/__tests__/project.generator.test.ts`

### User Interface
- Create `src/application/initializers/project.initializer.ts` with ProjectInitializer class
- Implement user interaction flow using inquirer
- Add validation integration with ProjectValidator
- Create error handling and success messaging
- Add initializer tests in `src/application/initializers/__tests__/project.initializer.test.ts`

### Validation
- Create `src/domain/validators/project.validator.ts` with ProjectValidator class
- Implement project name validation using zod
- Add directory validation logic
- Create configuration validation rules
- Add validator tests in `src/domain/validators/__tests__/project.validator.test.ts`

### Project Configuration
- Create `src/domain/config/project.config.ts` with ProjectConfig class
- Define configuration schema using zod
- Implement configuration transformation methods
- Add default values and override handling
- Create config tests in `src/domain/config/__tests__/project.config.test.ts`

### Project Model
- Create `src/domain/models/project.model.ts` with Project class
- Define project structure and metadata
- Implement state management methods
- Add metadata handling logic
- Create model tests in `src/domain/models/__tests__/project.model.test.ts`

### File System
- Create `src/system/filesystem/filesystem.ts` with FileSystem class
- Implement directory operations (create, delete, exists)
- Add file operations (read, write, copy)
- Create path handling utilities
- Add filesystem tests in `src/system/filesystem/__tests__/filesystem.test.ts`

### Templates
- Create `src/system/templates/template.engine.ts` with TemplateEngine class
- Implement template loading from filesystem
- Add template rendering with variable substitution
- Create template variable handling
- Add template tests in `src/system/templates/__tests__/template.engine.test.ts`

### Types
- Create `src/system/types/project.types.ts`
- Define project configuration interfaces
- Add command option types
- Create validation type definitions
- Add type tests in `src/system/types/__tests__/project.types.test.ts`

> End of programming instructions for feature plan `f1-project-initialization` at `c1-node-cli`. 