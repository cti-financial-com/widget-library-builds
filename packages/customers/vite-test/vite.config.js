import * as path from 'node:path';
// import pkg from './package.json';

import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import vue from '@vitejs/plugin-vue2';

const dependencies = new Set([
  'vue',
  'vue-demi',
  'vue-i18n',
  // 'vuex',
  '@dory/fe-sdk',
  '@dory/fe-fidlet',
  '@dory/fe-components',
  // '@dory/fe-composables',
  //   ...Object.keys(pkg.dependencies || {}),
  //   ...Object.keys(pkg.peerDependencies || {}),
]);

export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [{ src: 'src/**/*.scss', dest: 'dist/' }],
      hook: 'writeBundle',
      flatten: false,
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, '');
        },
      },
    ],
  },
  build: {
    outDir: 'dist-bundle',
    lib: {
      entry: path.resolve(__dirname, 'entry.js'),
      name: 'Library',
      formats: ['es'],
      fileName: (format, name) => {
        return `Library.${format}.js`;
      },
    },
    rollupOptions: {
      cache: true,
      output: {
        inlineDynamicImports: false,
        manualChunks: Array.from(dependencies).reduce((acc, dependency) => {
          // console.log('dependency', dependency);
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
    },
  },
});
