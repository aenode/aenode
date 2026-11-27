// @index([ './**/*.ts','!./**/*.spec.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/errors/base-fs-error.js';
export * from './lib/errors/file-exists-error.js';
export * from './lib/errors/file-not-exist-error.js';
export * from './lib/file.js';
export * from './lib/is-file-exists.js';
export * from './lib/move.js';
export * from './lib/read-json-file.js';
export * from './lib/read-text-file.js';
export * from './lib/rename.js';
export * from './lib/update-json-file.js';
export * from './lib/write-json-file.js';
export * from './lib/write-text-file.js';

