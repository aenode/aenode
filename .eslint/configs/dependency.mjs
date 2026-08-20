export default [
  {
    files: ['**/*.json'],

    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: ['@swc/helpers', 'tslib'],
          ignoredFiles: [
            '{projectRoot}/eslint.config.mjs',
            '{projectRoot}/prisma.config.ts',
            '{projectRoot}/vitest.config.mts',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
