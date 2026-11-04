import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export function Emit(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.EMIT, true)(...args);
  };
}

export function isEmitted(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return !!reflector.get<boolean | undefined>(
    MetadataToken.EMIT,
    context.getHandler(),
  );
}
