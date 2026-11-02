// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/{main,bootstrap}.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './bye/bye.js';
export * from './history/history.js';
export * from './merge/merge.js';
export * from './rename/rename.js';
export * from './replace/replace.js';
export * from './uuid/uuid.js';
