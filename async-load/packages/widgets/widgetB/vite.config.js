import * as path from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import copy from 'rollup-plugin-copy';

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
      name: 'WidgetB',
      formats: ['es'],
      fileName: (format) => `WidgetB.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        '@dory/fe-components',
        '@dory/fe-fidlet',
        '@dory/fe-sdk',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/pro-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        'd3',
        'date-fns',
        'lodash-es',
        'vue',
        'vue-demi',
        'vue-i18n',
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
