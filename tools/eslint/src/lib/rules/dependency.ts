export default [
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.mjs',
            '{projectRoot}/vitest.config.mts',
            '{projectRoot}/prisma.config.ts',
            '{projectRoot}/test/**/*.ts',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
