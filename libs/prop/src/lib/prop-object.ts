import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import { JsonTransformer } from './json-transformer.js';
import { __PropCommon } from './prop-common.js';
import type { ObjectValidationOptions } from './prop-options.js';
import { MaxProperties } from './validators/max-properties.js';
import { MinProperties } from './validators/min-properties.js';

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

    if (options.minProperties !== undefined) {
      MinProperties(options.minProperties, validationOptions)(...args);
    }

    if (options.maxProperties !== undefined) {
      MaxProperties(options.maxProperties, validationOptions)(...args);
    }

    __PropCommon(options, validationOptions)(...args);

    JsonTransformer()(...args);
    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
