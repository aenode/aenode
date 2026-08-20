import base from './.eslint/configs/base.mjs';

export default [
  ...base,
  {
    ignores: ['**/vitest.config.*.timestamp*'],
  },
];
