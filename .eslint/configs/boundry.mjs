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
              sourceTag: 'app:api',
              onlyDependOnLibsWithTags: ['app:api', 'app:cli', 'lib:module'],
            },
            {
              sourceTag: 'app:cli',
              onlyDependOnLibsWithTags: ['lib:module', 'lib:util', 'lib:types'],
            },
            {
              sourceTag: 'lib:module',
              onlyDependOnLibsWithTags: ['lib:module', 'lib:util', 'lib:types'],
            },
            {
              sourceTag: 'lib:util',
              onlyDependOnLibsWithTags: ['lib:types'],
            },
            {
              sourceTag: 'lib:types',
              onlyDependOnLibsWithTags: ['none:dependency'],
              allowedExternalImports: [],
            },
          ],
        },
      ],
    },
  },
];
