import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropOptions } from './prop-options.js';

export function __PropCommon(
  options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    DefaultValueTransformer(options)(...args);

    Expose({ groups: options.groups })(...args);

    if (required === true) {
      IsDefined(validationOptions)(...args);
    } else {
      IsOptional(validationOptions)(...args);
    }
  };
}
