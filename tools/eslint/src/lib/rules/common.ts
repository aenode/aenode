import nx from '@nx/eslint-plugin';
import dependency from './dependency.js';
import ignore from './ignore.js';
import moduleBoundry from './module-boundry.js';
import noUndefined from './no-undefined.js';
import noUnusedVars from './no-unused-vars.js';
import protocol from './protocol.js';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],

  ...ignore,
  ...moduleBoundry,
  ...dependency,
  ...noUndefined,
  ...noUnusedVars,
  ...protocol,
] as unknown[];
