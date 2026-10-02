import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

/**
 * Define a public resource controller/method
 * @returns
 */
export const Public = () => SetMetadata('PUBLIC', true);

export function isPublic(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return reflector.getAllAndOverride<boolean>(
    ['PUBLIC'],
    [context.getHandler(), context.getClass()],
  );
}
