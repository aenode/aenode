import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import type { PropValidationOptions } from './prop-options.js';
import { ToObjectTransformer } from './transformers/to-object-transformer.js';

export function __Object(
  options: PropValidationOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    const { type } = options;

    if (type === undefined) {
      throw new Error('Object property need type ');
    }

    push(ToObjectTransformer());
    push(Type(options.type));
    push(
      ValidateNested({
        ...validationOptions,
        validateIf(v) {
          return v !== null && v !== undefined;
        },
      }),
    );

    decorators.forEach((d) => d(...args));
  };
}
