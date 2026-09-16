import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
} from 'class-validator';
import type { PropValidationOptions } from './prop-options.js';
import { ToDateTransformer } from './transformers/to-date-transformer.js';

export function __Date(
  options: PropValidationOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { min, max } = options;

    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    push(IsDate(validationOptions));
    push(ToDateTransformer());

    if (typeof min === 'function' || min instanceof Date)
      push(MinDate(min, validationOptions));

    if (typeof max === 'function' || max instanceof Date)
      push(MaxDate(max, validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
