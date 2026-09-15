import type { ViteUserConfig } from 'vitest/config';

export default {
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/@aenode/brand-email',
  tsconfig: './tsconfig.spec.json',
  test: {
    name: '@aenode/brand-email',
    globals: true,
    watch: false,
    include: ['./src/**/*.spec.ts'],
    coverage: {
      reportsDirectory: './out-tsc/vitest/coverage',
    },
  },
} as ViteUserConfig;
