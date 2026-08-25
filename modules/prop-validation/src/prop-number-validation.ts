import { PropertyMathcer } from '@aenode/flow';
import type { PropOptions } from '@aenode/prop-options';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotIn,
  IsNumber,
  Max,
  Min,
  type ValidationOptions,
} from 'class-validator';

export function __PropNumberValidation(
  options: PropOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsNumber(undefined, vo)(...args);

    Transform(({ value }) => {
      if (typeof value === 'string') {
        return parseFloat(value);
      }
      return value;
    })(...args);

    const collectedDecorators = new PropertyMathcer<
      PropOptions,
      PropertyDecorator
    >(options)
      .isDefined('min', (v) => Min(v, vo))
      .isDefined('max', (v) => Max(v, vo))

      .isDefined('isIn', (v) => IsIn(v, vo))
      .isDefined('isNotIn', (v) => IsNotIn(v, vo))
      .collect();

    collectedDecorators.forEach((d) => d(...args));
  };
}
