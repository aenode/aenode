export default [
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'node:util',
              message:
                "Do not use 'node:util' in this library to ensure browser compatibility / light bundle size.",
            },
            {
              name: 'util',
              message: "Do not use legacy 'util' import.",
            },
          ],
        },
      ],
    },
  },
];
