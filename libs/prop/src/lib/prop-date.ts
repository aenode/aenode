import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
} from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropDateOptions } from './prop-options.js';

export function PropDate(
  options?: PropDateOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    const { min, max } = options ?? {};

    DefaultValueTransformer(options)(...args);
    IsDate(validationOptions)(...args);

    if (min) MinDate(min, validationOptions);
    if (max) MaxDate(max, validationOptions);
  };
}
