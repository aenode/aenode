import { extractResourceName } from '@aenode/names';
import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const RESOURCE_NAME_TOKEN = Symbol('RESOURCE_NAME_TOKEN');

export function getResourceName(
  reflector: Reflector,
  context: ExecutionContext,
) {
  return reflector.get(RESOURCE_NAME_TOKEN, context.getClass());
}

export function ResouceName(resourceName?: string): ClassDecorator {
  return (...args) => {
    resourceName ??= extractResourceName(args[0].name);
    SetMetadata(RESOURCE_NAME_TOKEN, resourceName)(...args);
  };
}
