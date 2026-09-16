import {
  IsEmail,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  type ValidationOptions,
} from 'class-validator';
import type { PropFormat, PropValidationOptions } from './prop-options.js';

export function __StringFormat(
  format: PropFormat,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    switch (format) {
      case 'name': {
        MaxLength(255, validationOptions)(...args);
        MinLength(3, validationOptions)(...args);
        break;
      }
      case 'email': {
        IsEmail(undefined, validationOptions)(...args);
        break;
      }
      case 'uuid4':
      case 'uuid': {
        IsUUID('4', validationOptions)(...args);
        break;
      }
      case 'uuid7': {
        IsUUID('7', validationOptions)(...args);
        break;
      }
    }
  };
}

export function __String(
  options: PropValidationOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { minLength, maxLength, format } = options;

    const decorators: PropertyDecorator[] = [];
    const push = (decorator: PropertyDecorator) => decorators.push(decorator);

    IsString()(...args);

    if (minLength !== undefined) push(MinLength(minLength, validationOptions));
    if (maxLength !== undefined) push(MaxLength(maxLength, validationOptions));
    if (format !== undefined) push(__StringFormat(format, validationOptions));

    decorators.forEach((d) => d(...args));
  };
}
