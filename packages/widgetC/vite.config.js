import * as path from 'node:path';
import { defineConfig } from 'vite';
import pkg from './package.json';
import copy from 'rollup-plugin-copy';

import vue from '@vitejs/plugin-vue2';

// https://vitejs.dev/config/
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
    lib: {
      entry: path.resolve(__dirname, 'entry.esm.js'),
      name: 'WidgetC',
      formats: ['es'],
      fileName: (format) => `WidgetC.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
      ],
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
