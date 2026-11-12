import { MetadataToken } from '@aenode/constants';
import { SetMetadata, type ExecutionContext } from '@aenode/nest/common';
import type { Reflector } from '@aenode/nest/core';
import type { Operation } from '@aenode/types';

export function OperationName(operation: Operation): MethodDecorator {
  return (...args) => {
    SetMetadata(MetadataToken.OPERATION_NAME, operation)(...args);
  };
}

export function getOperationName(
  context: ExecutionContext,
  reflector: Reflector,
): Operation {
  const operation = reflector.get<Operation>(
    MetadataToken.OPERATION_NAME,
    context.getHandler(),
  );

  if (!operation) {
    throw new Error(
      `Operation name metadata is found the target, ${context.getHandler()}`,
    );
  }
  return operation;
}
