import {
  IsInt,
  IsNumber,
  Max,
  Min,
  type ValidationOptions,
} from 'class-validator';
import type { NumberFormat, PropOptions } from './prop-options.js';
import { ToNumberTransformer } from './transformers/to-number-transformer.js';

export function __NumberFormat(
  format: NumberFormat,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    switch (format) {
      case 'integer':
      case 'int': {
        IsInt(validationOptions)(...args);
        break;
      }
    }
  };
}

export function __Number(
  options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { min, max, format } = options;

    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    push(
      IsNumber(
        { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 6 },
        validationOptions,
      ),
    );

    push(ToNumberTransformer());

    if (typeof min === 'number') push(Min(min, validationOptions));
    if (typeof max === 'number') push(Max(max, validationOptions));

    if (format !== undefined)
      push(__NumberFormat(format as NumberFormat, validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
