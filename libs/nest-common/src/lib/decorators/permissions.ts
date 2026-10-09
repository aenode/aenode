import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const PERMISSIONS_METADATA_TOKEN = 'PERMISSIONS_METADATA_TOKEN';

export const Permissions = (...permissions: string[]): MethodDecorator =>
  SetMetadata(PERMISSIONS_METADATA_TOKEN, permissions);

export function getPermissions(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return new Set(
    reflector.getAllAndMerge<string[]>(PERMISSIONS_METADATA_TOKEN, [
      context.getClass(),
      context.getHandler(),
    ]),
  );
}
