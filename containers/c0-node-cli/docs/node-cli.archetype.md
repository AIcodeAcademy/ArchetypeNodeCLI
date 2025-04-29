# Node CLI Archetype

## Description

A Node.js-based command-line interface tool designed to streamline the creation of new Node.js CLI applications. The system follows a modular architecture with clear separation of concerns, focusing on configuration management, command handling, and logging capabilities. It adheres to Node.js best practices and provides a standardized template structure for CLI application development.

- **Language**: TypeScript
- **Framework**: Vanilla TypeScript
- **Architecture**: Layered
- **Paradigm**: Functional and Object-Oriented

## Reference

- [Briefing Blueprint](/docs/briefing.blueprint.md)
- [Systems Architecture Blueprint](/docs/systems-architecture.blueprint.md)
- [Domain Model Blueprint](/docs/domain-model.blueprint.md)

## Project Structure

```
c0-node-cli/
├── .ai/rules                             # AI rules
│   ├── node-cli.rules.md                 # Archetype rules
│   ├── layered.rules.md                  # Architecture rules
│   └── typescript.rules.md               # Language rules
├── docs/                                 # Documentation
│   ├── node-cli.archetype.md             # Archetype description
│   └── builder.tracking.json             # Builder tracking
├── src/                                  # Source code
│   ├── application/                      # Application layer
│   │   ├── commands/                     # Command handlers
│   │   │   └── meteo/                    # Meteo command implementation
│   │   └── adapters/                     # External adapters
│   │       └── args/                     # Arguments adapter
│   ├── domain/                           # Domain layer
│   │   ├── services/                     # Business logic
│   │   │   └── meteo/                    # Meteo service
│   │   ├── models/                       # Domain models
│   │   │   └── meteo/                    # Meteo models
│   │   └── utils/                        # Domain utilities
│   │       ├── cache/                    # Cache utilities
│   │       └── crypto/                   # Crypto utilities
│   └── system/                           # System layer
│       ├── config/                       # Configuration system
│       ├── logging/                      # Logging system
│       ├── repositories/                 # Data access
│   │   ├── open-meteo/              # OpenMeteo repository
│   │   └── ip-api/                  # IP API repository
│   └── adapters/                     # System adapters
│       ├── fs/                       # File system adapter
│       ├── http/                     # HTTP adapter
│       └── env/                      # Environment adapter
├── tests/                                # Test files
└── README.md                             # Container description
```

## Bill of Materials

### Dependencies

- @biomejs/biome ^1.9.4
- @types/node ^22.15.2

### Dev Dependencies

- @biomejs/biome ^1.9.4
- @types/node ^22.15.2

## Scripts

- `start`: Run the application
- `dev`: Run in development mode with environment file and watch mode
- `test`: Run tests
- `lint`: Run Biome linter

> End of Archetype document for `c0-node-cli` container
