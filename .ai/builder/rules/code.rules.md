## Language
- Write code in TypeScript, fully typed and annotated.
- Layered architecture: presentation, domain, infrastructure , with no DI
- Functional paradigm

## Naming
- Use fully descriptive names for variables and functions
- Start with a verb functions and flag (like `is`, `has`, `can`...) variables 
- Avoid magic numbers and strings by declaring consts

## Functions
- Use early return to avoid nesting
- Prefer Higher-Order functions over loops
- Declare named functions for complex (> 4 instructions) function arguments

# Data types
- Prefer Type over class, interface or enum
- Avoid null, use undefined for optionals and default values for required
- Define functions for runtime validation and formatting

# Scaffolding
- Each file got a <intention>.<artifact>.ts name, intention are features or specifications, artifacts are architectural building blocks: `adapter`, `controller`, `mapper`,`repository`, `service`, `type`, `util`, `validator`
- There are three main folders: `app`, `domain`, `system` each for layered architecture, presentation, domain, infrastructure layers.
- There is another `utils` folder with shared utilities for any other folder.