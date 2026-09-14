import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/prisma-plugins',
  test: {
    name: '@aenode/prisma-plugins',
    watch: false,
    globals: true,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
}));
