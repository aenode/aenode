export default [
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/unbound-method': 'error',
    },
    ignores: ['**/*.spec.ts'],
  },
];
