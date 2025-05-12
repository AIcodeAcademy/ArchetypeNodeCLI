# Modular Architecture


## Modules
- In this context a module is a cohesive group of code that implements a single feature.
- Groups code in modules.
- Each module has a single purpose and responsibility.
- Duplicated code or common code should be in a shared module.
- Feature modules can depend upon shared modules.
- Shared modules must not depend upon feature modules.
- Depending on the language and system architecture a module can be:
  - a directory: just a folder with a name and some restrictions
  - a package: something you can compile and redistribute
  - a container: something you can run and deploy

## Scaffolding by feature, not by layer

- Screaming architecture:
- Folders for features and shared modules.
- Two main folders:
  - `features/` for feature specific modules.
  - `shared/` for shared modules.
  
```ascii
src/
├── features/    # Feature modules
│   ├── users/   # Users module
│   └── orders/  # Orders module
│   └── ...      # Other feature modules
└── shared/      # Shared modules
    ├── cache/   # Cache module
    ├── log/     # Log module
    └── ...      # Other shared modules
```

## Feature modules
- All related code for feature is inside the feature folder.
- Module should be cohesive and self-contained.
- A module exports and API that can be called by the root application or any other feature modules.
- If a module depends on any other module, try to reduce the surface and use abstractions.
- Complex features can be subdivided into sub-features.

```ascii
src/
├── features/
│   ├── users/
│   │   ├── add-user/
│   │   ├── delete-user/
│   │   └── ...
│   └── ...
```

### Layered inside feature modules
- Optional, only for complex features with multiple components.
- Feature or sub-feature modules can be subdivided into layers.
- Each layer has a single purpose and responsibility.
- Layers are ordered by dependency. 
- Top-Down dependencies: **API** -> **Domain** -> **System**

```ascii
src/
├── features/
│   ├── users/
│   │   ├── api/      # The public API of the feature
│   │   ├── domain/   # The business rules of the feature
│   │   └── system/   # The infrastructure of the feature
│   └── ...
```

## Components
- Components are building blocks of a module.
- Modules are collections of components.
- Components are closely related to files: Ideally one component per file.

Each component is tagged with:
 - feature-intention:  what solves
 - technical-type: how it solves it
  
Components and files should be named using both tags, feature and technical type.

### Technical types:

An Technical Type in this context is a class, object, function or variable that implements a design pattern or framework related artifact. For example:

- **Adapter**: Wraps and hides external or built-in frameworks dependencies
- **Builder**: Creates and configures instances
- **Command**: Extracts and processes user commands and arguments
- **Component**: Visual elements of user interface
- **Config**: Configuration and bootstrap
- **Controller**: Receives and redirects requests to the domain layer
- **Decorator**: Adds behavior to classes or functions
- **Facade**: Provides a simplified interface to a complex system
- **Factory**: Creates and configures instances
- **Gateway**: Connects to an external system (similar to an adapter)
- **Interface**: Defines a contract for classes
- **Mapper**: Data transformation
- **Repository**: Persist or fetch from an store (local or remote)
- **Service**: Main logic, and transformation
- **Singleton**: Ensures a class has only one instance and a point of access to it
- **Type**: Data structures, and default values
- **Util**: Common utilities, not tied to an specific domain
- **Validator**: Data validation




