import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';

export function Emit(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.EMIT, true)(...args);
  };
}

export function isEmit(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return !!reflector.get<boolean>(MetadataToken.EMIT, context.getHandler());
}

export function EmitInput(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.EMIT_INPUT, true)(...args);
  };
}

export function isEmitInput(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return !!reflector.get<boolean>(
    MetadataToken.EMIT_INPUT,
    context.getHandler(),
  );
}

export function EmitOutput(): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.EMIT_OUTPUT, true)(...args);
  };
}

export function isEmitOutput(
  context: ExecutionContext,
  reflector: Reflector,
): boolean {
  return !!reflector.get<boolean>(
    MetadataToken.EMIT_OUTPUT,
    context.getHandler(),
  );
}
