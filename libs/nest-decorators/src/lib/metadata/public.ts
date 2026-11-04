import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

/**
 * Mark the target resource as public which will bypass the authentication
 *
 * @returns Class decorator
 */
export function Public(): ClassDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.PUBLIC, true)(...args);
  };
}

/**
 * Check the resource is marked as public or not.
 *
 * @param context nestjs execution context
 * @param reflector nestjs core Reflector
 * @returns boolean
 */
export function isPublic(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return !!reflector.get<boolean | undefined>(
    MetadataToken.PUBLIC,
    context.getClass(),
  );
}
