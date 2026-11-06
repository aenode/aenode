import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export const Permissions = (...permissions: string[]) =>
  SetMetadata(MetadataToken.PERMISSIONS, permissions);

export function getPermissions(
  context: ExecutionContext,
  reflector: Reflector,
): string[] | undefined {
  const permissions = reflector.getAllAndMerge<string[]>(
    MetadataToken.PERMISSIONS,
    [context.getHandler(), context.getClass()],
  );
  return permissions;
}
