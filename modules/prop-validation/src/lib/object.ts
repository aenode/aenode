import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import type { PropOptions } from './prop-options.js';

export function __Object(
  options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    const { type } = options;

    if (type === undefined) {
      throw new Error('Object property need type ');
    }

    push(Type(options.type));
    push(ValidateNested(validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
