import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropValidationOptions } from './prop-options.js';

export function __PropCommon(
  options: PropValidationOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    Expose({ groups: options.groups })(...args);
    DefaultValueTransformer(options)(...args);

    if (required === true) {
      IsDefined(validationOptions)(...args);
    } else {
      IsOptional(validationOptions)(...args);
    }
  };
}
