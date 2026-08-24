import { PropertyMathcer } from '@aenode/flow';
import type { PropOptions } from '@aenode/prop-options';
import {
  IsIn,
  IsNotIn,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  type ValidationOptions,
} from 'class-validator';

export function __PropStringValidation(
  options: PropOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  const vo = validationOptions;

  return (...args) => {
    IsString(vo)(...args);

    const collectedDecorators = new PropertyMathcer<
      PropOptions,
      PropertyDecorator
    >(options)
      .isDefined('minLength', (v) => MinLength(v, vo))
      .isDefined('maxLength', (v) => MaxLength(v, vo))
      .isDefined('pattern', (v) => Matches(new RegExp(v), vo))
      .isDefined('isIn', (v) => IsIn(v, vo))
      .isDefined('isNotIn', (v) => IsNotIn(v, vo))
      .isDefined('isUuid', () => IsUUID('all', vo))
      .collect();

    collectedDecorators.forEach((d) => d(...args));
  };
}
