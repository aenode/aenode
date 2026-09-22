import base from './.eslint/configs/base.mjs';

export default [
  ...base,
  {
    ignores: ['**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
