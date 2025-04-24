# Node CLI Container

This container implements a Node.js-based command-line interface tool designed to streamline the creation of new Node.js CLI applications. It follows a modular architecture with clear separation of concerns, focusing on configuration management, command handling, and logging capabilities.

## Features

- Project Initialization
- Configuration System
- Command Management
- Logging and Error Handling

## Installation

```powershell
npm install
```

## Usage

```powershell
npm start
```

## Documentation

- [Archetype Documentation](/containers/c1-node-cli/docs/node-cli.archetype.md)
- [Systems Architecture Blueprint](/docs/systems-architecture.blueprint.md)

## Development

### Project Structure

```
c1-node-cli/
├── .ai/                                  # AI rules
├── docs/                                 # Documentation
├── src/                                  # Source code
│   ├── application/                      # Application layer
│   ├── domain/                           # Domain layer
│   └── system/                           # System layer
└── tests/                                # Test files
```

### Testing

```powershell
npm test
```

### Linting

```powershell
npm run lint
```

### Formatting

```powershell
npm run format
``` 