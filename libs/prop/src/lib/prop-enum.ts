import { IsEnum, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { PropEnumOptions } from './prop-options.js';

export function PropEnum(options: PropEnumOptions): PropertyDecorator {
  return (...args) => {
    __PropEnum(options)(...args);
  };
}

export function __PropEnum(
  options: PropEnumOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);
    IsEnum(options.enum, validationOptions)(...args);
  };
}
