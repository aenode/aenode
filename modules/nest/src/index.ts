export * from '@nestjs/common';
export * from '@nestjs/core';

// @index(['./**/*.ts', '!./**/*.spec.ts', '!./**/index.ts'], f => `export * from '${f.path}.js'`)
export * from './common/bootstrap.js';
export * from './common/common.controller.js';
export * from './common/common.module.js';
export * from './common/get-config.js';
export * from './decorators/prop/prop-options.js';
export * from './decorators/prop/prop.js';
export * from './decorators/prop/to-api-property-options.js';
export * from './decorators/public.js';
export * from './peers.js';
