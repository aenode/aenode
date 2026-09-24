import { IsBoolean, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { BooleanValidationOptions } from './prop-options.js';

/**
 * Boolean property validation decorator
 *
 * @param options boolean validation options
 * @returns a property decorator
 */
export function PropBoolean(
  options: BooleanValidationOptions,
): PropertyDecorator {
  return (...args) => {
    __PropBoolean(options)(...args);
  };
}

/**
 * Boolean property validation decorator
 *
 * @param options boolean validation options
 * @returns a property decorator
 */
export function __PropBoolean(
  options: BooleanValidationOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const inferedType = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: inferedType === Array,
      groups: options?.groups,
    };
    __PropCommon(options, validationOptions)(...args);
    IsBoolean(validationOptions)(...args);
  };
}
