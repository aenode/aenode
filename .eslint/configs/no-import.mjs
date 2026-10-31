export default [
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/^(?!\\.\\.?\\/)/]',
          message: 'Internal/external packages are forbidden.',
        },
        {
          selector:
            "CallExpression[callee.name='require'] > Literal[value=/^(?!\\.\\.?\\/)/]",
          message: 'Internal/external packages are forbidden.',
        },
      ],
    },
  },
];
