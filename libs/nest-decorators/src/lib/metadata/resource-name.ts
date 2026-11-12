import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export function ResourceName(resourceName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.RESOURCE_NAME, resourceName)(...args);
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
    throw new Error(
      `string is not set for the target, ${context.getClass().name}`,
    );
  }
  return resourceName;
}
