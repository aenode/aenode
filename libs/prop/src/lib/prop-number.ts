import { IsNumber, Max, Min, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropNumberOptions } from './prop-options.js';

export function PropNumber(
  options: PropNumberOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    const { min, max } = options;

    IsNumber(undefined, validationOptions)(...args);
    DefaultValueTransformer(options)(...args);

    if (min !== undefined) Min(min, validationOptions)(...args);
    if (max !== undefined) Max(max, validationOptions)(...args);
  };
}
