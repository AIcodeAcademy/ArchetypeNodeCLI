# Node CLI Archetype

## Description

This archetype defines a Node.js-based command-line interface tool that provides a standardized template and structure for creating new Node.js CLI applications. It follows a layered architecture with clear separation of concerns, focusing on configuration management, command handling, and logging capabilities.

- **Language**: TypeScript
- **Framework**: Node.js
- **Architecture**: Layered
- **Paradigm**: Functional

## Reference

- [Systems Architecture Blueprint](/docs/systems-architecture.blueprint.md)
- [Project Initialization](/docs/f1-project-initialization.blueprint.md)
- [Configuration System](/docs/f2-configuration-system.blueprint.md)
- [Command Management](/docs/f3-command-management.blueprint.md)
- [Logging and Error Handling](/docs/f4-logging-error-handling.blueprint.md)

## Project Structure

```
c1-node-cli/
├── .ai/                                  # AI rules
│   ├── node-cli.rules.md                 # Archetype rules
│   ├── layered.rules.md                  # Architecture rules
│   └── typescript.rules.md               # Language rules
├── docs/                                 # Documentation
│   ├── node-cli.archetype.md             # Archetype description
│   └── builder.tracking.json             # Builder tracking
├── src/                                  # Source code
│   ├── application/                      # Application layer
│   ├── domain/                           # Domain layer
│   └── system/                           # System layer
├── tests/                                # Test files
└── README.md                             # Container description
```

## Bill of Materials

### Dependencies

- `commander` - Command-line interface framework
- `pino` - Logging library
- `zod` - TypeScript-first schema validation

### Dev Dependencies

- `typescript` - TypeScript compiler
- `@types/node` - TypeScript definitions for Node.js
- `biome` - Linting and formatting
- `@types/jest` - TypeScript definitions for Jest
- `jest` - Testing framework
- `ts-jest` - TypeScript preprocessor for Jest

> End of Archetype document for `c1-node-cli` container 