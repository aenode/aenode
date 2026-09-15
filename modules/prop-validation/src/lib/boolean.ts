import { IsBoolean, type ValidationOptions } from 'class-validator';
import type { PropOptions } from './prop-options.js';

export function __Boolean(
  _options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    push(IsBoolean(validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
