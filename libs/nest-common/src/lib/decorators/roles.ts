import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const ROLES_METADATA_TOKEN = 'ROLES_METADATA_TOKEN';

export const Roles = (...roles: string[]): MethodDecorator =>
  SetMetadata(ROLES_METADATA_TOKEN, roles);

export function getRoles(context: ExecutionContext, reflector: Reflector) {
  return new Set(
    reflector.getAllAndMerge<string[]>(ROLES_METADATA_TOKEN, [
      context.getClass(),
      context.getHandler(),
    ]),
  );
}
