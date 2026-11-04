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
              sourceTag: 'lib:shared',
              onlyDependOnLibsWithTags: ['lib:shared', 'lib:types'],
            },
            {
              sourceTag: 'lib:module',
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
