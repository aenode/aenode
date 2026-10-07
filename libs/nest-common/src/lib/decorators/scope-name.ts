import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants.js';
import { type Reflector } from '@nestjs/core';

export const SCOPE_NAME_METADATA_TOKEN = 'SCOPE_NAME_METADATA_TOKEN';

export function ScopeName(scopeName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(RESPONSE_PASSTHROUGH_METADATA, scopeName)(...args);
  };
}

export function getScopeName(
  context: ExecutionContext,
  reflector: Reflector,
): string {
  return (
    reflector.get(SCOPE_NAME_METADATA_TOKEN, context.getClass()) ?? 'default'
  );
}
