export default [
  {
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Catches any function or decorator call where 'undefined' is explicitly passed
          selector:
            "CallExpression[arguments.length=1] > Identifier[name='undefined']",
          message:
            "Do not pass 'undefined' explicitly. Rely on the default parameter value by omitting the argument entirely.",
        },
      ],
    },
  },
];
