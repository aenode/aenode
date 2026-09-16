import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const PublicToken = Symbol('PUBLIC_TOKEN');

export function getPublic(reflector: Reflector, context: ExecutionContext) {
  return reflector.get(PublicToken, context.getClass());
}

export function Public(value?: string): ClassDecorator {
  return (...args) => {
    SetMetadata(PublicToken, value)(...args);
  };
}
