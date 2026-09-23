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
    const inferedType = Reflect.getMetadata('design:type', ...args);
    const isArrayType = inferedType === Array;

    if (isArrayType) {
      if (!options.type) {
        throw new Error('Could not resolve the object type');
      }
    } else {
      options.type = () => inferedType;
    }

    validationOptions ??= {
      each: options?.isArray ?? isArrayType,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
