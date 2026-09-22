import { VitestOptions } from 'vitest/node';

export default {
  test: {
    projects: [
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '!vitest.config.ts',
      '!vite.config.ts',
    ],
  },
} as VitestOptions;
