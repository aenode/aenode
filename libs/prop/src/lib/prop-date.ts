import { Transform } from '@aenode/nest/transformer';
import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
  isISO8601,
} from '@aenode/nest/validator';
import { __PropCommon } from './prop-common.js';
import type { DateValidationOptions } from './prop-options.js';

/**
 * Date property validation decorator
 *
 * @param options date validation options
 * @returns a property decorator
 */
export function PropDate(options: DateValidationOptions): PropertyDecorator {
  return (...args) => {
    __PropDate(options)(...args);
  };
}

/**
 * Date property validation decorator
 *
 * @param options date validation options
 * @returns a property decorator
 */
export function __PropDate(
  options?: DateValidationOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const inferedType = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: inferedType === Array,
      groups: options?.groups,
    };

    const { minDate: min, maxDate: max } = options ?? {};

    __PropCommon(options, validationOptions)(...args);

    Transform(({ value }) => {
      if (isISO8601(value)) {
        return new Date(value);
      }
      return value;
    })(...args);
    IsDate(validationOptions)(...args);

    if (min) MinDate(min, validationOptions)(...args);
    if (max) MaxDate(max, validationOptions)(...args);
  };
}
