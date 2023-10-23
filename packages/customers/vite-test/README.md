# Findings

- vite (to be more correct rollup) can't handle code splitting in `umd` builds
  - https://github.com/rollup/rollup/issues/3490
  - to support this we need additional libraries & code (e.g. `SystemJS`)
