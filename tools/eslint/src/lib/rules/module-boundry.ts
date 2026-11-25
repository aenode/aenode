export default [
  {
    files: ['**/*.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'server:*',
              onlyDependOnLibsWithTags: ['server:*', 'data:*', 'node:lib', 'shared:lib'],
            },
            {
              sourceTag: 'client:*',
              onlyDependOnLibsWithTags: ['client:lib', 'shared:lib'],
            },
            {
              sourceTag: 'node:lib',
              onlyDependOnLibsWithTags: ['node:lib', 'shared:lib'],
            },
            {
              sourceTag: 'client:lib',
              onlyDependOnLibsWithTags: ['client:lib', 'shared:lib'],
            },
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['shared:lib'],
            },
          ],
        },
      ],
    },
  },
];
