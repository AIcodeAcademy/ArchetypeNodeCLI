## Language
- Write code in TypeScript, fully typed and annotated.
- Place related functions and variables in module files.
- Export only what is needed outside the module.
- When importing use the full file name including the extension `.ts`.
- Use `async`/`await` for async code.

### Module naming
- Each file got a <intention>.<artifact>.ts name.
- Intention are features or specifications in camel-case.
- Artifacts are architectural building blocks: `adapter`, `command`, `controller`, `mapper`,`repository`, `service`, `type`, `util`, `validator`.
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. `import { foo } from 'bar'`)

## Naming
- Use fully descriptive names for variables and functions.
- Start with a verb every function and flag variables (like `is`, `has`, `can`...).  
- Avoid magic numbers and strings by declaring consts.

## Instructions
- Do not nest ternary operators.
- Use `===` and `!==` for equality checks.
- Use temp variables for complex expressions.

## Functions
- Use early return to avoid nesting.
- Prefer Higher-Order functions over loops.
- Declare named functions for complex (> 4 instructions) function arguments.

## Data types
- Avoid primitive obsession and define Types in its own `*.type.ts` file.
- Avoid null, use undefined for optionals and default values for required.
- Define functions for runtime validation and formatting.

## Error handling
- Use `try-catch` at top level of the application.
- Define and use a logger for error handling.

## Patterns
- Use Adapter pattern to wrap external dependencies.
- Use Factory, Singleton and Builder patterns when needed.
- Avoid Dependency Injection (DI) patterns.
- Try to be DRY, but not at the cost of readability.