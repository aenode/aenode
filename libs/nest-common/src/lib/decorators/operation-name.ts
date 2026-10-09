import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const OPERATION_NAME_METADATA_TOKEN = 'OPERATION_NAME_METADATA_TOKEN';

export function OperationName(operationName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(OPERATION_NAME_METADATA_TOKEN, operationName)(...args);
  };
}

export function getOperationName(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return reflector.getAllAndOverride(OPERATION_NAME_METADATA_TOKEN, [
    context.getHandler(),
  ]);
}
