import { defineConfig } from 'vite';
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
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
