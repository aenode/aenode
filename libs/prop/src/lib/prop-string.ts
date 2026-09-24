import {
  IsDataURI,
  IsEAN,
  IsEmail,
  IsIn,
  IsJSON,
  IsNotIn,
  IsString,
  IsStrongPassword,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
  type ValidationOptions,
} from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { StringFormat, StringValidationOptions } from './prop-options.js';

/**
 * String property format validation decorator
 *
 * @param format string format {@link StringFormat}
 * @param validationOptions class-validator validation options
 * @returns a property decorator
 */
export function __PropStringFormat(
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
      case 'uuid4':
      case 'uuid': {
        IsUUID('4', validationOptions)(...args);
        break;
      }
      case 'uuid7': {
        IsUUID('7', validationOptions)(...args);
        break;
      }
      case 'ean': {
        IsEAN(validationOptions)(...args);

        break;
      }
      case 'name': {
        MinLength(3, validationOptions)(...args);
        MinLength(255, validationOptions)(...args);
        break;
      }
      case 'json': {
        IsJSON(validationOptions)(...args);
        break;
      }
      case 'data-uri': {
        IsDataURI(validationOptions)(...args);
        break;
      }
      case 'url': {
        IsUrl(undefined, validationOptions)(...args);
        break;
      }
    }
  };
}

/**
 * String property validation decorator
 *
 * @param options string validation options {@link StringValidationOptions}
 * @returns a property decorator
 */
export function PropString(
  options: StringValidationOptions,
): PropertyDecorator {
  return (...args) => {
    __PropString(options)(...args);
  };
}

export function __PropString(
  options?: StringValidationOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const inferedType = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: inferedType === Array,
      groups: options?.groups,
    };

    const { format, isIn, isNotIn, maxLength, minLength } = options ?? {};

    __PropCommon(options, validationOptions)(...args);
    IsString(validationOptions)(...args);

    if (format) {
      __PropStringFormat(format, validationOptions)(...args);
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
