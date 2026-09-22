import { IsBoolean, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropBooleanOptions } from './prop-options.js';

export function PropBoolean(
  options: PropBooleanOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    IsBoolean(validationOptions)(...args);
    DefaultValueTransformer(options)(...args);
  };
}
