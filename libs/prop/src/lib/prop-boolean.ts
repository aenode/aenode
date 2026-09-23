import { IsBoolean, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { PropBooleanOptions } from './prop-options.js';

export function PropBoolean(options: PropBooleanOptions): PropertyDecorator {
  return (...args) => {
    __PropBoolean(options)(...args);
  };
}

export function __PropBoolean(
  options: PropBooleanOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };
    __PropCommon(options, validationOptions)(...args);
    IsBoolean(validationOptions)(...args);
  };
}
