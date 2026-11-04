import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export function ResourceName(operation: string): ClassDecorator {
  return () => {
    SetMetadata(MetadataToken.RESOURCE_NAME, operation);
  };
}

export function getResourceName(
  context: ExecutionContext,
  reflector: Reflector,
): string {
  const resourceName = reflector.get<string>(
    MetadataToken.RESOURCE_NAME,
    context.getClass(),
  );

  if (!resourceName) {
    throw new Error(`string is not swet for the target, ${context.getClass()}`);
  }
  return resourceName;
}
