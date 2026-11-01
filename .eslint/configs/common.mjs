import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  //
  {
    files: ['**/*.json'],
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  // Ignore configuraiton and generated files
  {
    ignores: [
      '**/dist',
      '**/out',
      '**/out-tsc',
      '**/generated/prisma/**',
      '**/generated/nest/**',
      '**/vitest.config.*.timestamp*',
      '**/prisma.config.ts',
      '**/vitest.config.mts',
      '**/eslint.config.mjs',
      '**/*.js',
    ],
  },
];
