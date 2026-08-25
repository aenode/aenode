import { PropertyMathcer } from '@aenode/flow';
import type { PropOptions } from '@aenode/prop-options';
import { Transform } from 'class-transformer';
import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
} from 'class-validator';

export function __PropDateValidation(
  options: PropOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;

    IsDate(vo)(...args);

    Transform(({ value }) => {
      if (typeof value === 'string') {
        return new Date(value);
      }
      return value;
    })(...args);

    const colelctedDecorators = new PropertyMathcer(options)
      .isDefined('maxDate', (value) => MaxDate(value, vo))
      .isDefined('minDate', (value) => MinDate(value, vo))

      .collect();

    colelctedDecorators.forEach((d) => d(...args));
  };
}
