import { extractResourceName, names } from '@aenode/names';
import { OnEvent as NestOnEvent } from '@aenode/nest/emitter';

export function OnEvent(
  resouceName?: string,
  operationName?: string,
  ...suffixes: string[]
): MethodDecorator {
  return (...args) => {
    resouceName ??= extractResourceName(args[0].constructor.name);
    operationName ??= names(args[1].toString().slice(2)).constant;

    const eventName = [resouceName, operationName, ...suffixes]
      .filter((e) => e)
      .join('.')
      .toUpperCase();

    NestOnEvent(eventName)(...args);
  };
}
export function OnEventInput(
  resouceName?: string,
  operationName?: string,
): MethodDecorator {
  return (...args) => {
    OnEvent(resouceName, operationName, 'INPUT')(...args);
  };
}
export function OnEventOutput(
  resouceName?: string,
  operationName?: string,
): MethodDecorator {
  return (...args) => {
    OnEvent(resouceName, operationName, 'OUTPUT')(...args);
  };
}
