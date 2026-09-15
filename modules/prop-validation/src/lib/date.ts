import {
  IsDate,
  MaxDate,
  MinDate,
  type ValidationOptions,
} from 'class-validator';
import type { PropOptions } from './prop-options.js';

export function __Date(
  options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { min, max } = options;

    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    push(IsDate(validationOptions));

    if (typeof min === 'function' || min instanceof Date)
      push(MinDate(min, validationOptions));

    if (typeof max === 'function' || max instanceof Date)
      push(MaxDate(max, validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
