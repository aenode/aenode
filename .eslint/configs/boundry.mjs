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
              sourceTag: 'app:system',
              onlyDependOnLibsWithTags: ['app:api', 'app:gql', 'app:module'],
            },
            {
              sourceTag: 'app:api',
              onlyDependOnLibsWithTags: ['app:cli', 'lib:module'],
            },
            {
              sourceTag: 'app:gql',
              onlyDependOnLibsWithTags: ['app:cli', 'lib:module'],
            },
            {
              sourceTag: 'app:cli',
              onlyDependOnLibsWithTags: [
                'lib:module',
                'lib:utils',
                'lib:types',
              ],
            },
            {
              sourceTag: 'app:plugin',
              onlyDependOnLibsWithTags: [
                'lib:module',
                'lib:utils',
                'lib:types',
              ],
            },
            {
              sourceTag: 'lib:module',
              onlyDependOnLibsWithTags: [
                'lib:module',
                'lib:utils',
                'lib:types',
              ],
            },
            {
              sourceTag: 'lib:utils',
              onlyDependOnLibsWithTags: ['lib:types'],
            },
            {
              sourceTag: 'lib:types',
              onlyDependOnLibsWithTags: ['lib:types'],
              allowedExternalImports: [],
            },
          ],
        },
      ],
    },
  },
];
