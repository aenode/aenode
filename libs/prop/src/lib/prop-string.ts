import {
  IsEmail,
  IsIn,
  IsNotIn,
  IsStrongPassword,
  MaxLength,
  MinLength,
  type ValidationOptions,
} from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropStringOptions, StringFormat } from './prop-options.js';

export function PropStringFormat(
  format: StringFormat,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    switch (format) {
      case 'email': {
        IsEmail(undefined, validationOptions)(...args);
        break;
      }
      case 'password': {
        IsStrongPassword(undefined, validationOptions)(...args);
        break;
      }
      case 'uuid':
      case 'name':
      case 'json':
    }
  };
}

export function PropString(
  options?: PropStringOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    const { format, isIn, isNotIn, maxLength, minLength } = options ?? {};

    DefaultValueTransformer(options)(...args);

    if (format) {
      PropStringFormat(format, validationOptions)(...args);
    }

    if (isIn) {
      IsIn(isIn, validationOptions)(...args);
    }

    if (isNotIn) {
      IsNotIn(isNotIn, validationOptions)(...args);
    }

    if (maxLength) {
      MaxLength(maxLength, validationOptions)(...args);
    }

    if (minLength) {
      MinLength(minLength, validationOptions)(...args);
    }
  };
}
