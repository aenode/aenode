import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/iam-db',
  test: {
    name: '@aenode/iam-db',
    watch: false,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
}));
