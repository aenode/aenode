import {
  SetMetadata,
  type CustomDecorator,
  type ExecutionContext,
} from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const PUBLIC_TOKEN = Symbol('PUBLIC_TOKEN');

export function isPublicResource(
  reflector: Reflector,
  context: ExecutionContext,
) {
  return reflector.getAllAndOverride<boolean>(reflector, [
    context.getHandler(),
    context.getClass(),
  ]);
}

export function Public(): CustomDecorator {
  return ((target, propertyKey, descriptor) => {
    SetMetadata(PUBLIC_TOKEN, true)(target, propertyKey, descriptor);
  }) as CustomDecorator;
}
