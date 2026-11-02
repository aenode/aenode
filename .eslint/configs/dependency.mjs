export default [
  {
    files: ['**/*.json'],

    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: [
            '@swc/helpers',
            'tslib',
            'vitest',
            '@nx/devkit',
            '@types/express',
          ],
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
