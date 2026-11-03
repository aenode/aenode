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
              sourceTag: 'e2e:*',
              onlyDependOnLibsWithTags: ['*'],
            },

            {
              sourceTag: 'cli:*',
              onlyDependOnLibsWithTags: ['lib:*', 'cli:*'],
            },
            {
              sourceTag: 'lib:*',
              onlyDependOnLibsWithTags: ['lib:shared'],
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
