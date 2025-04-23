# Typescript Language rules 

## Language
- Write fully typed and annotated variables and functions.
- Use `async`/`await` for async code.

### Modules
- Place related functions and variables in module files.
- Each file got a `<intention>.<artifact>.ts` name in kebab-case.
- Export only what is needed outside the module.
- When importing use the full file name including the extension `.ts`.
- Intention are features or specifications in kebab-case.
- Artifacts are architectural building blocks.
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. `import { foo } from 'bar.ts'`)
- Import types specifically from the module file (eg. `import type { Foo } from './foo.ts'`)

## Naming
- Use fully descriptive names for variables and functions.
- Start with a verb every function and flag variables (like `is`, `has`, `can`...).  
- Avoid magic numbers and strings by declaring consts.
- Variables and functions are in camelCase.
- Classes and types are in PascalCase.
- Constants are in UPPER_SNAKE_CASE.

## Instructions
- Do not nest ternary operators.
- For complex expressions, create steps with temporary variables.

## Functions
- Use early return to avoid nesting.
- Prefer Higher-Order functions over loops.
- Declare named functions for complex (> 4 instructions) function arguments.
- Write short functions with a single purpose (<= 16 instructions).

## Data types
- Avoid `any` type, use `unknown` at the last resort.
- Use `===` and `!==` for equality checks.
- Avoid primitive obsession and define Types in its own `*.type.ts` file.
- Avoid null, use undefined for optionals and default values for required.
- Define functions for runtime validation and formatting.

## Error handling
- Use `try-catch` at top level of the application.
- In other cases, use `try-catch` only it it adds value (eg. fix something or add context).
- Define and use a logger for error handling.

## Patterns
- Use Adapter pattern to wrap external or framework dependencies.
- Prefer composition over inheritance.
- Use Factory, Singleton or Builder patterns only when its mandatory.
- Try to be DRY, but not at the cost of readability.
- Most important: Keep it simple.
