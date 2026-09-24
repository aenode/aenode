// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/_*.ts'], f => `export * from '${f.path}.js'`)
export * from './lib/prisma.module.js';
export * from './lib/provide-client.js';
export * from './lib/provide-delegate.js';
