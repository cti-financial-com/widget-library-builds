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

## Experiments

### `async-load`

This is currently WiP. The idea is to asynchronously load the widgets in the hopes that this will help the build tools construct the dependency graph.

### `vite-modules`

Build Widgets that share dependencies using vite. The issue with this experiment is that there is no good way to share the dependency graph between widgets. So we get dependency files that are theoretically identical but rely on the current behavior of the build tools to maintain this. Additionally cache invalidation is a problem as the proven approach of using a hash in the filename is not possible (again due to no shared information).
