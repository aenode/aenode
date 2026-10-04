import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants.js';
import { type Reflector } from '@nestjs/core';

export const OPERATION_NAME_METADATA_TOKEN = 'OPERATION_NAME_METADATA_TOKEN';

export function OperationName(operationName: string): ClassDecorator {
  return (...args) => {
    SetMetadata(RESPONSE_PASSTHROUGH_METADATA, operationName)(...args);
  };
}

export function getOperationName(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return reflector.get(OPERATION_NAME_METADATA_TOKEN, context.getClass());
}
