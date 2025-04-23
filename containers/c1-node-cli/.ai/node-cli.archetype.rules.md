# Node CLI Archetype rules

- **Architecture** : Layered, no DI
- **Paradigm** : Functional
- **Language** : TypeScript
- **Framework** : Node.js
- **Testing** : Node.js built-in testing
- **Linting** : {{: ESLint | Biome}}
- **Formatting** : {{: Prettier | Biome}}

### Artifacts

Each instance should be in a module file with name convention <intention>.<artifact>.ts 

- **Adapter**: Wraps and hides external or built-in frameworks dependencies
- **Command**: Extracts and processes user commands and arguments
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation


## Dependencies

Try to be dependency free, but if needed, use:

- `Axios` to fetch data from the internet (prefer a wrapper over fetch built-in functions)
- `Chalk` to colorize the console output (prefer console and styleText built-in functions)
- `Commander` to parse command line arguments (prefer parseArgs built-in functions)
- `Pino` to log messages (prefer console or file system built-in functions)
- `Zod` to validate data types (prefer domain validation functions)

### DevDependencies

- `Biome` for linting and formatting (alternatively use `ESLint` and `Prettier`)

## Testing

- Use the built-in testing module (alternatively use `Jest`)
