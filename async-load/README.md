# Async Load

## Folder Structure

- `/internal`
  - `/widgets`
    - some helpers for the widgets, base classes, defaults, etc
- `/packages`
  - `/customers`
    - specify customer specific settings & build files
  - `/widgets`
    - each widget folder contains a standalone widget
      - using vite, can run a single widget for development purposes
      - using vite, can build an ESM bundle of the Widget for releases to npm
    - contains the JavaScript API used by Widget clients
    - each widget would contain their relevant story files
  - `/storybook`
    - contains the setup for the demo/documentation storybook
    - not included in this reduced example
