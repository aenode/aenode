import { Transform } from 'class-transformer';
import type { PropValidationOptions } from './prop-options.js';

/**
 * Property value transformer for default values.
 *
 * @param options
 * @returns a property decorator
 */
export function DefaultValueTransformer(
  options?: Pick<PropValidationOptions, 'defaultValue'>,
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
