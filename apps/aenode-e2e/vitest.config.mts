import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: '@aenode/aenode-e2e',
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts'],
  },
});
