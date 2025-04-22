# System layer rules

- Use the `src/system` folder to implement the system layer.
- Common artifacts:
  - Types
  - Repositories
  - Utils
  
## Data type definitions

- File name convention `{{type}}.type.ts`
- Add default values to avoid nulls. 

## Fetch and save data repositories

- File name convention `{{type}}.repository.ts`
- Define adapters for non standard clients, ex: databases, axios, etc. `{{tool}}.adapter.ts`


## Low level utilities

- File name convention `{{name}}.util.ts`
- Group related utilities in the same file.
- Try to be DRY, but not at the cost of readability.

> Guardrails:
> only use stuff from its own layer

