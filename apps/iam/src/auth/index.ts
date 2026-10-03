// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/{main,bootstrap}.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './auth.module.js';
export * from './login/login.controller.js';
export * from './login/login.service.js';
