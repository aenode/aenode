// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/{main,bootstrap}.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './api/app.module.js';
export * from './api/role/role.controller.js';
export * from './api/role/role.module.js';
export * from './api/user/user.controller.js';
export * from './api/user/user.module.js';
export * from './data/role/role-data.module.js';
export * from './data/role/role.service.js';
export * from './data/user/user-data.module.js';
export * from './data/user/user.service.js';
