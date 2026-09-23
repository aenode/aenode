import { Transform } from 'class-transformer';
import type { PropValidationOptions } from './prop-options.js';

export function DefaultValueTransformer(
  options?: PropValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};

    const { defaultValue } = options;
    if (defaultValue) {
      Transform(({ value }) => {
        if (value !== undefined && value !== null) {
          return value;
        }
        return defaultValue;
      })(...args);
    }
  };
}
