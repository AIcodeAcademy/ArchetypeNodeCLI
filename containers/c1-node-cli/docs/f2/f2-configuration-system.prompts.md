# Prompts for Configuration System Implementation

## Description

This document contains the prompts for implementing the Configuration System feature in the Node CLI container. The implementation follows a layered architecture approach, with tasks organized across System, Domain, and Application layers.

## Reference

- [Implementation Plan](/docs/f2/f2-configuration-system.plan.md)
- [Node CLI Archetype](/docs/node-cli.archetype.md)
- [TypeScript Rules](/.ai/rules/typescript.language.rules.md)
- [Node CLI Rules](/.ai/rules/node-cli.archetype.rules.md)

## Instructions

### System Layer Tasks

#### Task 1: Implement Configuration Types and Validation using Zod

1. Create a new file at `src/system/config/types.ts`
2. Import required dependencies:
   - `zod` for schema validation
   - `dotenv` for environment variable support
3. Define the base configuration schema with the following structure:
   - Environment: string (development, production, test)
   - Logging: object with level and format
   - Database: object with connection details
   - API: object with endpoints and authentication
4. Create environment-specific schemas that extend the base schema
5. Implement validation functions:
   - `validateConfig`: Validates a configuration object against the schema
   - `validateEnv`: Validates environment variables against the schema
6. Export the schemas and validation functions
7. Add TypeScript type definitions derived from the Zod schemas

#### Task 2: Create Configuration Loaders

1. Create a new file at `src/system/config/loaders.ts`
2. Implement the file loader:
   - Create `loadConfigFile` function that accepts a file path
   - Support JSON file format
   - Handle file not found errors gracefully
   - Parse and validate the loaded configuration
3. Implement the environment loader:
   - Create `loadEnvConfig` function
   - Load environment variables from .env file
   - Map environment variables to configuration structure
   - Handle missing or invalid environment variables
4. Create a configuration loader interface:
   - Define `ConfigLoader` interface with load method
   - Implement `FileConfigLoader` class
   - Implement `EnvConfigLoader` class
5. Add error handling and logging for load failures

### Domain Layer Tasks

#### Task 3: Develop Configuration Loading Strategy

1. Create a new file at `src/domain/config/strategy.ts`
2. Implement environment detection:
   - Create `detectEnvironment` function
   - Check NODE_ENV environment variable
   - Fallback to development if not set
3. Create configuration source prioritization:
   - Define priority order: env vars > config files > defaults
   - Implement `mergeConfigs` function to handle priority
4. Build the configuration pipeline:
   - Create `ConfigurationPipeline` class
   - Implement step-by-step loading process
   - Add validation at each step
5. Implement error handling and recovery strategies

#### Task 4: Add Configuration Utilities

1. Create a new file at `src/domain/config/utils.ts`
2. Implement configuration transformation:
   - Create `transformConfig` function
   - Handle type conversions
   - Process environment-specific values
3. Add validation helpers:
   - Create `validateRequiredFields` function
   - Implement `validateTypes` function
   - Add custom validation rules
4. Implement type guards:
   - Create `isValidConfig` function
   - Add `isEnvironmentConfig` function
5. Add environment-specific utilities:
   - Create `getEnvironmentConfig` function
   - Implement `mergeEnvironmentConfigs` function

### Application Layer Tasks

#### Task 5: Implement Configuration Access

1. Create a new file at `src/application/config/access.ts`
2. Implement the singleton pattern:
   - Create `ConfigurationManager` class
   - Add private constructor and static instance
   - Implement `getInstance` method
3. Add configuration access methods:
   - Implement `get` method with type safety
   - Add `set` method with validation
   - Create `reload` method
4. Implement debug logging:
   - Add `debug` method
   - Log configuration changes
   - Track configuration state
5. Add configuration reloading:
   - Implement `reloadConfig` method
   - Handle reload errors
   - Notify subscribers of changes

#### Task 6: Create Configuration CLI Commands

1. Create a new file at `src/application/commands/config.ts`
2. Implement the config:show command:
   - Create `ConfigShowCommand` class
   - Add pretty-printing of configuration
   - Support filtering by section
3. Implement the config:validate command:
   - Create `ConfigValidateCommand` class
   - Add validation checks
   - Show validation results
4. Implement the config:reload command:
   - Create `ConfigReloadCommand` class
   - Add reload functionality
   - Show reload status
5. Implement the config:debug command:
   - Create `ConfigDebugCommand` class
   - Show configuration sources
   - Display environment info

## Summary

The implementation follows a bottom-up approach, starting with the System Layer to establish core functionality, then building the Domain Layer for business rules, and finally implementing the Application Layer for user interaction. Each layer's implementation should be thoroughly tested and documented.

## Git

```bash
# Initialize feature branch
git checkout -b feature/f2-configuration-system

# Add new files
git add src/system/config/types.ts
git add src/system/config/loaders.ts
git add src/domain/config/strategy.ts
git add src/domain/config/utils.ts
git add src/application/config/access.ts
git add src/application/commands/config.ts

# Commit changes
git commit -m "feat: implement configuration system"
```

> End of Prompts for `f2-configuration-system` 