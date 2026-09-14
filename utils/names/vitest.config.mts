import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/names',
  test: {
    name: '@aenode/names',
    watch: false,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
}));
