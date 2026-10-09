import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const RESOURCE_NAME_METADATA_TOKEN = 'RESOURCE_NAME_METADATA_TOKEN';

export function ResourceName(resourceName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(RESOURCE_NAME_METADATA_TOKEN, resourceName)(...args);
  };
}

export function getResourceName(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return reflector.getAllAndOverride(RESOURCE_NAME_METADATA_TOKEN, [
    context.getClass(),
  ]);
}
