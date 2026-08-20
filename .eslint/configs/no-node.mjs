export default [
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['node:*'],
              message:
                "Do not import any Node.js built-in ('node:*') modules. Keep this library runtime-agnostic.",
            },
          ],
        },
      ],
    },
  },
];
