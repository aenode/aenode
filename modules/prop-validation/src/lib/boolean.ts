import { IsBoolean, type ValidationOptions } from 'class-validator';
import type { PropOptions } from './prop-options.js';
import { ToBooleanTransformer } from './transformers/to-boolean-transformer.js';

export function __Boolean(
  _options: PropOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    push(IsBoolean(validationOptions));
    push(ToBooleanTransformer());

    decorators.forEach((d) => d(...args));
  };
}
