# Node CLI Archetype

- **Architecture** : Layered, no DI
- **Framework** : Node latest
- **Paradigm** : Functional

## Artifacts

Each instance should be in a module file with name convention <intention>.<artifact>.ts 

- **Adapter**: Wraps and hides external dependencies
- **Command**: Extracts and processes user commands and arguments
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation

## Layers

- Top-Down dependencies: Presentation -> Domain -> Infrastructure

- Bottom-Up implementation: Infrastructure -> Domain -> Presentation

### Presentation layer

Folder name : `src/app`

- Configuration and bootstrap
- User interface/interaction
- Logs operation and technical

> Guardrails: 
> can use anything exported by the domain layer
> can use types exported by the infrastructure layer 

### Domain layer

Folder name : `src/domain`

- Validation rules
- Service level logic

> Guardrails:
> can use anything exported by the infrastructure layer

### Infrastructure

Folder name : `src/system`

- Data types
- Fetch and save data 
- Low level utilities

> Guardrails:
> only use stuff from its own layer

## Dependencies

- Node latest
- Typescript latest
- Zod to validate data types
- Chalk to colorize the console output
- Commander to parse command line arguments
- Axios to fetch data from the internet
- Pino to log messages
