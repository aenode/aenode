import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
} from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { PropDateOptions } from './prop-options.js';

export function PropDate(options: PropDateOptions): PropertyDecorator {
  return (...args) => {
    __PropDate(options)(...args);
  };
}

export function __PropDate(
  options?: PropDateOptions,
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
    IsDate(validationOptions)(...args);

    if (min) MinDate(min, validationOptions)(...args);
    if (max) MaxDate(max, validationOptions)(...args);
  };
}
