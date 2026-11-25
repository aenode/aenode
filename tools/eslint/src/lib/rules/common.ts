import nx from '@nx/eslint-plugin';
import moduleBoundry from './module-boundry.js';
import dependency from './dependency.js';
import ignore from './ignore.js';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  ...ignore,
  ...moduleBoundry,
  ...dependency,
] as unknown[];
