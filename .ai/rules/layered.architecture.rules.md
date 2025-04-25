# Layered Architecture

- Groups related features in layers with a ordered dependency.
- Each layer has a single purpose and responsibility.
- Top-Down dependencies: **Application** -> **Domain** -> **System**
- Scaffolding, one folder per layer:
  
```ascii
src/
├── application/  # User/API interaction
├── domain/       # Business rules
└── system/       # Infrastructure
```

- Features are spread across layers, works well for a small set of features.
- Do not create any other folder level inside the layers.

## Application Layer
- The **Application** layer is the entry point of the application.
- Configuration and bootstrap
- User interface/interaction
- Logs operational events
- Higher level utilities
- Common artifacts at this layer:
  - **Command**: Extracts and processes user commands and arguments
  - **Component**: Visual elements of user interface
  - **Controller**: Receives and redirects requests to the domain layer

> Depends on the **Domain** and **System** layers.

## Domain Layer
- The **Domain** layer contains the business rules and logic.
- Validation rules
- Service level logic
- Transformations
- Business rules
- Common artifacts at this layer:
  - **Validator**: Data validation
  - **Mapper**: Data transformation
  - **Service**: Main logic, and transformation
  
> Depends on the **System** layer.

## System Layer
- The **System** layer contains the infrastructure and configuration.
- Data type definitions
- Fetch and save data repositories
- Low level utilities
- Common artifacts at this layer:
  - **Adapter**: Wraps and hides external or built-in frameworks dependencies
  - **Repository**: Persist or fetch from an store (local or remote)
  - **Type**: Data structures, and default values
  - **Util**: Common utilities, not tied to an specific domain

> Depends on its own artifacts. 


### Artifacts

Each instance should be in a module file with name convention <intention>.<artifact>.ts 

- **Command**: Extracts and processes user commands and arguments
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation