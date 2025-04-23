# Node CLI Archetype

## Description

A TypeScript-based Node.js CLI application archetype that provides a clean, dependency-free template for building command-line applications. It follows a layered architecture with functional programming principles, focusing on command handling, configuration management, and logging capabilities.

- **Language**: TypeScript
- **Framework**: Vanilla TypeScript
- **Architecture**: Layered
- **Paradigm**: Functional

## Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Systems Architecture Blueprint](/docs/systems-architecture.blueprint.md)

## Bill of Materials

### Dependencies

- typescript latest version
- @types/node latest version

### Dev Dependencies

- biome latest version

### Project Structure

```
c1-node-cli/
├── .ai/                  # AI rules
├── docs/                 # Documentation
├── src/
│   ├── application/     # Application layer (CLI commands, handlers)
│   ├── domain/          # Domain layer (business logic, models)
│   └── system/          # System layer (configuration, logging)
├── tests/               # Test files
├── package.json         # Project configuration
└── tsconfig.json        # TypeScript configuration
```

> End of Archetype document for `c1-node-cli` container 