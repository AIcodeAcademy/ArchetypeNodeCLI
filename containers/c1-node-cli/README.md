# Node CLI Container

This container implements a Node.js CLI application that provides a standardized template and structure for creating new Node.js CLI applications. It follows a layered architecture with clear separation of concerns, focusing on configuration management, command handling, and logging capabilities.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Usage

The CLI provides the following commands:

- `init`: Initialize a new Node.js CLI project
- `config`: Manage configuration settings
- `command`: Create new commands
- `log`: Configure logging options

For detailed usage instructions, refer to the [Archetype Document](docs/node-cli.archetype.md).

## Documentation

- [Project Briefing](/docs/briefing.blueprint.md)
- [Archetype Document](docs/node-cli.archetype.md)
- [Systems Architecture](/docs/systems-architecture.blueprint.md)

## Development

1. Install development dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Run the CLI:
   ```bash
   npm start
   ``` 