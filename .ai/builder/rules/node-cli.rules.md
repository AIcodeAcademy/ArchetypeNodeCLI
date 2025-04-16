# Node CLI Archetype

- **Architecture** : Layered
- **Framework** : Node latest
- **Paradigm** : Functional

## Artifacts

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

### Presentation

Folder name : `app`

- Configuration and bootstrap
- User interface/interaction
- Logs operation and technical

> Guardrails: 
> can use anything exported by the domain layer
> can use types and utils exported by the infrastructure layer 

### Domain 

Folder name : `domain`

- Validation rules
- Service level logic

> Guardrails:
> can use anything exported by the infrastructure layer

### Infrastructure

Folder name : `system`

- Data types
- Fetch and save data 
- Low level utilities

> Guardrails:
> only use exported stuff from its own layer


