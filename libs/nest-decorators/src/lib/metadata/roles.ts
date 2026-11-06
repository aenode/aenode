import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export const Roles = (...permissions: string[]) =>
  SetMetadata(MetadataToken.ROLES, permissions);

export function getRoles(
  context: ExecutionContext,
  reflector: Reflector,
): string[] | undefined {
  const roles = reflector.getAllAndMerge<string[]>(MetadataToken.PERMISSIONS, [
    context.getHandler(),
    context.getClass(),
  ]);
  return roles;
}
