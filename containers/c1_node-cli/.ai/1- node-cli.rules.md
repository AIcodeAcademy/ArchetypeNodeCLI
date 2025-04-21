# Node CLI Archetype rules

- **Architecture** : Layered, no DI
- **Paradigm** : Functional

## Layered Architecture

- Top-Down dependencies: **Application** -> **Domain** -> **System**

- Bottom-Up implementation: **System** -> **Domain** -> **Application**


### Artifacts

Each instance should be in a module file with name convention <intention>.<artifact>.ts 

- **Adapter**: Wraps and hides external dependencies
- **Command**: Extracts and processes user commands and arguments
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation

### Application layer

Folder name : `src/app`

- Configuration and bootstrap
- User interface/interaction
- Logs operational and technical
- Higher level utilities

> Guardrails: 
> can use anything exported by the **Domain** or **System** layers

### Domain layer

Folder name : `src/domain`

- Validation rules
- Service level logic
- Transformations

> Guardrails:
> can use anything exported by the **System** layer

### System Layer

Folder name : `src/system`

- Data type definitions
- Fetch and save data repositories
- Low level utilities

> Guardrails:
> only use stuff from its own layer

## Dependencies

- `Axios` to fetch data from the internet
- `Chalk` to colorize the console output
- `Commander` to parse command line arguments
- `Pino` to log messages
- `Zod` to validate data types

### DevDependencies

- `Biome` for linting and formatting
