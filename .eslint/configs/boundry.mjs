export default [
  {
    files: ['**/*.ts', '**/package.json'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.mjs$'],
          depConstraints: [
            {
              sourceTag: 'app:*',
              onlyDependOnLibsWithTags: ['app:*', 'lib:*', 'data:*'],
            },

            {
              sourceTag: 'cli:*',
              onlyDependOnLibsWithTags: ['lib:*'],
            },
            {
              sourceTag: 'lib:*',
              onlyDependOnLibsWithTags: ['lib:*'],
            },

            {
              sourceTag: 'data:*',
              onlyDependOnLibsWithTags: ['data:*', 'lib:*'],
            },
          ],
        },
      ],
    },
  },
];
