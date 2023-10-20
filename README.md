# Refinitive Widget Library - Build improvements

## Restrictions

- Each widget needs to produce at least one output file
  - dependencies of the widget should not be included in this file
  - dependencies should be bundled in separate files
    - common dependencies (e.g. `vue`, `vue-i18n`, `vuex`) can be bundled together in one file
    - each dependency should be bundled in a separate file
    - ideally the build produces an indicator which dependencies are used by the widget
  - output should be as small as possible
    - but treeshaking will be difficult due to the shared dependencies
- all build artifacts needs to work together in all combinations
  - this means that, at build time, there is no information about:
    - which widgets will be used
    - which widgets will be used together
- build has to be in `umd` format
