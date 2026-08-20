import unicorn from 'eslint-plugin-unicorn';

export default [
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/prefer-node-protocol': 'error',
    },
  },
];
