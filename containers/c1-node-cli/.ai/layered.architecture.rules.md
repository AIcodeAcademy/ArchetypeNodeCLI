# Layered Architecture

- Top-Down dependencies: **Application** -> **Domain** -> **System**
- Each layer has a single purpose and responsibility.
- Features are spread across layers, works well for a small set of features.

- Scaffolding :
  
```ascii
src/
├── application/
├── domain/
└── system/
```

## Application Layer
- The **Application** layer is the entry point of the application.
- Configuration and bootstrap
- User interface/interaction
- Logs operational and technical
- Higher level utilities
- Common artifacts:
  - Adapters
  - Components
  - Commands
  - Controllers
  - Utils

> Depends on the **Domain** and **System** layers.

## Domain Layer
- The **Domain** layer contains the business rules and logic.
- Validation rules
- Service level logic
- Transformations
- Business rules
- Common artifacts:
  - Mappers
  - Services
  - Validators
  
> Depends on the **System** layer.

## System Layer
- The **System** layer contains the infrastructure and configuration.
- Data type definitions
- Fetch and save data repositories
- Low level utilities
- Common artifacts:
  - Adapters
  - Repositories
  - Types
  - Utils

> Depends on its own artifacts. 
