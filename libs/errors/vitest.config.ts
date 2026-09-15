import type { ViteUserConfig } from 'vitest/config';

export default {
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/errors',
  tsconfig: './tsconfig.spec.json',
  test: {
    name: '@aenode/errors',
    globals: true,
    watch: false,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
} as ViteUserConfig;
