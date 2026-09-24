import {
  IsInt,
  IsNumber,
  Max,
  Min,
  type ValidationOptions,
} from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { NumberFormat, NumberValidationOptions } from './prop-options.js';

/**
 * Number property format validation decorator
 *
 * @param format number format {@link NumberFormat}
 * @param validationOptions class-validation validation options.
 * @returns a property decorator
 */
export function __PropNumberFormat(
  format: NumberFormat,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    switch (format) {
      case 'integer': {
        IsInt(validationOptions)(...args);
        break;
      }
      case 'positive': {
        Min(0, validationOptions)(...args);
        break;
      }
      case 'percent': {
        Min(0, validationOptions)(...args);
        Max(100, validationOptions)(...args);
        break;
      }
    }
  };
}

/**
 * Number property validation decorator
 *
 * @param options number validation options
 * @param validationOptions class-validator validation options
 * @returns a property decorator
 */
export function __PropNumber(
  options: NumberValidationOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const inferedType = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: inferedType === Array,
      groups: options?.groups,
    };

    const { min, max, format } = options;

    __PropCommon(options, validationOptions)(...args);
    IsNumber(undefined, validationOptions)(...args);

    if (min !== undefined) Min(min, validationOptions)(...args);
    if (max !== undefined) Max(max, validationOptions)(...args);

    if (format) {
      __PropNumberFormat(format, validationOptions)(...args);
    }
  };
}
