// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/{main,bootstrap}.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './extract-resource-name.js';
export * from './names.js';
export * from './pluralize.js';
export * from './token.js';
