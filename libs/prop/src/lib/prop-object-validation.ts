import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { JsonTransformer } from './json-transformer.js';
import { __PropCommon } from './prop-common.js';
import type { ObjectValidationOptions } from './prop-options.js';

/**
 * Object property validation decorator
 *
 * @param options object validation options {@link ObjectValidationOptions}
 * @returns a property decorator
 */
export function PropObjectValidation(
  options: ObjectValidationOptions &
    Required<Pick<ObjectValidationOptions, 'type'>>,
): PropertyDecorator {
  return (...args) => {
    const validationOptions = {
      each: options.isArray,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    JsonTransformer()(...args);
    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
