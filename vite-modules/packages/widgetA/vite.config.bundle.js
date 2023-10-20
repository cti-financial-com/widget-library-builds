import * as path from 'node:path';
import { defineConfig } from 'vite';
import pkg from './package.json';

import vue from '@vitejs/plugin-vue2';
import replace from 'rollup-plugin-replace';

const dependencies = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    replace({
      values: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        'global.process.env.NODE_ENV': JSON.stringify('production'),
      },
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
      entry: path.resolve(__dirname, 'src', 'api.js'),
      name: 'WidgetA',
      // formats: ['system'],
      // formats: ['iife'],
      // formats: ['umd'],
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
            case 'vue-i18n-bridge':
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
        chunkFileNames: '[name].mjs',
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: Array.from(dependencies),
    },
  },
});
