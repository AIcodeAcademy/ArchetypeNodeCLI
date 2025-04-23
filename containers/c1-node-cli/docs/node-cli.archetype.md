# Node CLI Archetype

## Description

This archetype defines the structure and configuration for a Node.js CLI application that provides a standardized template and structure for creating new Node.js CLI applications. It follows a layered architecture with clear separation of concerns, focusing on configuration management, command handling, and logging capabilities.

- **Language**: TypeScript
- **Framework**: Node.js
- **Architecture**: Layered
- **Paradigm**: Functional

## Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Systems Architecture Blueprint](/docs/systems-architecture.blueprint.md)
- [Domain Model Blueprint](/docs/domain-model.blueprint.md)

## Bill of Materials

### Dependencies

Try to be dependency free, but allow for future use by wrapping into adapters any framework dependencies that could be an external dependency like:

- commander (for command line argument parsing)
- dotenv (for environment variable management)
- pino (for logging)
- zod (for data validation)

### Dev Dependencies

- @types/node latest
- biome latest
- typescript latest

### Project Structure

```
c1-node-cli/
├── .ai/                  # AI rules
├── docs/                 # Documentation
├── src/
│   ├── application/     # Application layer (commands, CLI interface)
│   ├── domain/          # Domain layer (business logic, models)
│   └── system/          # System layer (configuration, logging)
├── tests/               # Test files
├── package.json         # Project configuration
└── tsconfig.json        # TypeScript configuration
```

> End of Archetype document for `c1-node-cli` container 