import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/nestjs-helpers',
  test: {
    name: '@aenode/nestjs-helpers',
    watch: false,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
}));
