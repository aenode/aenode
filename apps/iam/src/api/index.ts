// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/main.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './app.controller.js';
export * from './app.module.js';
export * from './bootstrap.js';
export * from './user/user.controller.js';
export * from './user/user.module.js';
