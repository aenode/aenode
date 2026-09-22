import Boundry from './boundry.mjs';
import Common from './common.mjs';
import Dependency from './dependency.mjs';
import Equal from './equal.mjs';
import NoUnbound from './no-unbound.mjs';
import NoUndefined from './no-undefined.mjs';
import Protocol from './protocol.mjs';
import TypeImport from './type-import.mjs';

export default [
  ...Common,
  ...Boundry,
  ...Dependency,
  ...Equal,
  ...NoUnbound,
  ...NoUndefined,
  ...Protocol,
  ...TypeImport,
];
