import * as path from 'node:path';
import pkg from './package.json';

import { mergeConfig } from 'vite';
import DevConfig from './vite.config.dev.js';

export default mergeConfig(DevConfig, {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'entry.esm.js'),
      name: 'WidgetA',
      formats: ['es'],
      fileName: (format) => `WidgetA.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
      ],
    },
  },
});
