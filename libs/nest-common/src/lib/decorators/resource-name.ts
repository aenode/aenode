import { extractResourceName, names } from '@aenode/names';
import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { RESPONSE_PASSTHROUGH_METADATA } from '@nestjs/common/constants.js';
import { type Reflector } from '@nestjs/core';

export const RESOURCE_NAME_METADATA_TOKEN = 'RESOURCE_NAME_METADATA_TOKEN';

export function ResourceName(resourceName?: string): ClassDecorator {
  return (...args) => {
    resourceName ??= names(extractResourceName(args[0].name)).pascal;
    SetMetadata(RESPONSE_PASSTHROUGH_METADATA, resourceName)(...args);
  };
}

export function getResourceName(
  context: ExecutionContext,
  reflector: Reflector,
) {
  return reflector.get(RESOURCE_NAME_METADATA_TOKEN, context.getClass());
}
