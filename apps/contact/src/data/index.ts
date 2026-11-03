// @index(['./**/*.ts', '!./**/*.spec.ts','!./**/index.ts', '!./**/_*.ts','!./**/main.ts', '!./**/generated/**'], f => `export * from '${f.path}.js'`)
export * from './address/address.module.js';
export * from './address/address.service.js';
export * from './email/email.module.js';
export * from './email/email.service.js';
export * from './phone/phone.module.js';
export * from './phone/phone.service.js';
