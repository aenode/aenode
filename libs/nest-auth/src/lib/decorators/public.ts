import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const PUBLIC_METADATA_TOKEN = 'PUBLIC_METADATA_TOKEN';
/**
 * Define a public resource controller/method
 * @returns
 */
export const Public = () => SetMetadata(PUBLIC_METADATA_TOKEN, true);

export function isPublic(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return reflector.getAllAndOverride<boolean>(PUBLIC_METADATA_TOKEN, [
    context.getHandler(),
    context.getClass(),
  ]);
}
