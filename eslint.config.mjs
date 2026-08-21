import base from './.eslint/configs/base.mjs';

export default [
  ...base,
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    ignores: ['**/vitest.config.*.timestamp*'],
  },
];
