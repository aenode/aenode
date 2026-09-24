import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { ObjectValidationOptions } from './prop-options.js';

/**
 * Object property validation decorator
 *
 * @param options object validation options
 * @returns a property decorator
 */
export function PropObject(
  options: ObjectValidationOptions &
    Required<Pick<ObjectValidationOptions, 'type'>>,
): PropertyDecorator {
  return (...args) => {
    __PropObject(options)(...args);
  };
}

/**
 * Object property validation decorator
 *
 * @param options object validation options {@link ObjectValidationOptions}
 * @param validationOptions class-validator validation options
 * @returns a validatino decorator
 */
export function __PropObject(
  options?: ObjectValidationOptions,
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
      each: isArrayType,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
