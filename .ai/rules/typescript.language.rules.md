# Typescript Language rules 

## Modules
- Write one module per file.
- Each module got a `<intention>.<artifact>.ts` name in kebab-case.
- Intention are features or specifications. ex: `auth`, `user`, `payment`, `order`...
- Artifacts are architectural building blocks. ex: `service`, `controller`, `util`...
- Use ES modules (`import`/`export`) syntax, not CommonJS (`require`)
- When importing use the full file name including the extension `.ts`.
- Destructure imports when possible (eg. `import { foo } from 'bar.ts'`)
- Import types specifically from the module file (eg. `import type { Foo } from './foo.ts'`)

## Naming
- Variables and functions are in camelCase.
- Classes and types are in PascalCase.
- Constants are in UPPER_SNAKE_CASE.

## Functions
- Use `async`/`await` for async code.	
- Prefer Higher-Order array methods over loops.
- Use one liner fat arrow functions by defining and calling complex functions.

## Data types
- Write fully typed and annotated variables and functions.
- Do not use `enum` , define union types instead.
- Avoid `any` type, use `unknown` at the last resort.
- Use `===` and `!==` for equality checks.
- Avoid primitive obsession and define Types in its own `*.type.ts` file.
- Avoid `null`, use `undefined` for optionals and default values for required.
- Define logic for runtime validation and formatting.

## Error handling
- Use `try-catch` at top level of the application.
- In other cases, use `try-catch` only if it adds value (eg. fix something or add context).
- Define and use a logger for error handling.
