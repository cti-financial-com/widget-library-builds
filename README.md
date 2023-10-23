# Refinitive Widget Library - Build improvements

## Restrictions

- the build format has to be `umd`
  - `es` is now widely supported by browsers but at the moment (2023-10-20) we want to stay on `umd` for maximum compatibility
  - it's also easier for customers to integrate `umd` builds (compared to `es` builds)
- at the time of build we don't have information which widgets will be used
  - all build artifacts (widgets, dependencies, etc) need to work together in all combinations
- each widget needs to produce:
  - a main file (containing the JavaScript API to initialize and interact with the widget)
  - a bundle with dependencies only used by this widget
  - either:
    - information about shared dependencies, consumed at a later build step
    - a build of the shared dependencies, these need to work with other widgets too
  - a list with all required dependencies to help customers integrate the widget
- the output should be as small as possible
  - treeshaking will be hard to implement due to the shared dependencies
- a set of base dependencies can be bundled into a `vendors` bundle
  - this would include
    - `vue`
    - `vue-demi`
    - `vue-i18n`
    - `vuex`

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
