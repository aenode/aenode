import { extractResourceName } from '@aenode/names';
import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const OPERATION_NAME_TOKEN = Symbol('RESOURCE_NAME_TOKEN');

export function getOperationName(
  reflector: Reflector,
  context: ExecutionContext,
) {
  return reflector.get(OPERATION_NAME_TOKEN, context.getHandler());
}

export function OperationName(operationName?: string): MethodDecorator {
  return (...args) => {
    if (!operationName) {
      const resourceName = extractResourceName(args[0].constructor.name);
      operationName = `${resourceName}_${args[1].toString()}`;
    }

    SetMetadata(OPERATION_NAME_TOKEN, operationName)(...args);
  };
}
