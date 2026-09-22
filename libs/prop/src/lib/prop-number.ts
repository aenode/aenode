import {
  IsInt,
  IsNumber,
  Max,
  Min,
  type ValidationOptions,
} from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { NumberFormat, PropNumberOptions } from './prop-options.js';

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

export function __PropNumber(
  options: PropNumberOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
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
