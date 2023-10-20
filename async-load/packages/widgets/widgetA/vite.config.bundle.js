import * as path from 'node:path';
import pkg from './package.json';

import { mergeConfig } from 'vite';
import DevConfig from './vite.config.dev.js';

const dependencies = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]);

export default mergeConfig(DevConfig, {
  build: {
    outDir: 'dist-bundle',
    lib: {
      entry: path.resolve(__dirname, 'entry.bundle.js'),
      name: 'WidgetA',
      formats: ['es'],
      fileName: (format) => `WidgetA.${format}.js`,
    },
    rollupOptions: {
      cache: true,
      output: {
        inlineDynamicImports: false,
        manualChunks: Array.from(dependencies).reduce((acc, dependency) => {
          console.log('dependency', dependency);
          switch (dependency) {
            case 'vue':
            case 'vue-i18n':
            case 'vue-demi': {
              if (!acc.vue) acc.vue = [];
              acc.vue.push(dependency);
              break;
            }
            case '@dory/fe-sdk': {
              acc.sdk = [dependency];
              break;
            }
            case '@dory/fe-composables':
            case '@dory/fe-components':
            case '@dory/fe-fidlet': {
              if (!acc.dory) acc.dory = [];
              acc.dory.push(dependency);
              break;
            }
            default: {
              acc[dependency] = [dependency];
            }
          }
          return acc;
        }, {}),
      },
      chunkFileNames: '[name].mjs',
      //   // make sure to externalize deps that shouldn't be bundled
      //   // into your library
      //   external: [
      //     ...Object.keys(pkg.dependencies || {}),
      //     ...Object.keys(pkg.peerDependencies || {}),
      //   ],
    },
  },
});
