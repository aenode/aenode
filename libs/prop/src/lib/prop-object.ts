import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { PropObjectOptions } from './prop-options.js';

export function PropObject(options: PropObjectOptions): PropertyDecorator {
  return (...args) => {
    __PropObject(options)(...args);
  };
}

export function __PropObject(
  options?: PropObjectOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    Type(() => type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
