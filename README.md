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

## Experiments

### `async-load`

This is currently WiP. The idea is to asynchronously load the widgets in the hopes that this will help the build tools construct the dependency graph.

### `vite-modules`

Build Widgets that share dependencies using vite. The issue with this experiment is that there is no good way to share the dependency graph between widgets. So we get dependency files that are theoretically identical but rely on the current behavior of the build tools to maintain this. Additionally cache invalidation is a problem as the proven approach of using a hash in the filename is not possible (again due to no shared information).
