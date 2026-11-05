// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/{main,bootstrap}.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './prisma-client.module.js';
export * from './prisma-client.provider.js';
export * from './prisma-delegate.provider.js';
