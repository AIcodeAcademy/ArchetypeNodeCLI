## Language
- Write code in TypeScript, fully typed and annotated.
- Place related functions and variables in module files.
- Export only what is needed outside the module.

### Module naming
- Each file got a <intention>.<artifact>.ts name.
- Intention are features or specifications in camel-case.
- Artifacts are architectural building blocks: `adapter`, `controller`, `mapper`,`repository`, `service`, `type`, `util`, `validator`.

## Naming
- Use fully descriptive names for variables and functions.
- Start with a verb every function and flag variables (like `is`, `has`, `can`...).  
- Avoid magic numbers and strings by declaring consts.

## Functions
- Use early return to avoid nesting
- Prefer Higher-Order functions over loops
- Declare named functions for complex (> 4 instructions) function arguments

## Data types
- Avoid primitive obsession and define Types in its own `*.type.ts` file.
- Avoid null, use undefined for optionals and default values for required.
- Define functions for runtime validation and formatting.

