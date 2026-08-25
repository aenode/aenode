import { SetMetadata, type ExecutionContext } from '@nestjs/common';
import { type Reflector } from '@nestjs/core';

export const EVENT_NAME_TOKEN = Symbol('EVENT_NAME_TOKEN');

export function getEventName(reflector: Reflector, context: ExecutionContext) {
  return reflector.get<string>(reflector, context.getHandler());
}

export function EventName(eventName?: string): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    eventName ??= propertyKey.toString();
    SetMetadata(EVENT_NAME_TOKEN, eventName)(target, propertyKey, descriptor);
  };
}
