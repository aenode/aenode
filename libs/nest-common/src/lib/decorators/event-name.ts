import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const EVENT_NAME_METADATA_TOKEN = 'EVENT_NAME_METADATA_TOKEN';

export function EventName(eventName: string): MethodDecorator {
  return (...args) => {
    SetMetadata(EVENT_NAME_METADATA_TOKEN, eventName)(...args);
  };
}

export function getEventName(context: ExecutionContext, reflector: Reflector) {
  return reflector.getAllAndOverride(EVENT_NAME_METADATA_TOKEN, [
    context.getHandler(),
  ]);
}
