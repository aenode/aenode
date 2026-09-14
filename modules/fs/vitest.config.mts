import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/fs',
  test: {
    name: '@aenode/fs',
    watch: false,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
}));
