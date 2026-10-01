// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './app.module.js';
export * from './role/role.controller.js';
export * from './role/role.module.js';
export * from './user/user.controller.js';
export * from './user/user.module.js';
