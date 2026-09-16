import 'reflect-metadata';
//
import { getPropType } from '@aenode/reflect';
import type { ClassConstructor } from 'class-transformer';
import { IsEnum, IsIn, IsNotIn, type ValidationOptions } from 'class-validator';
import { __Boolean } from './boolean.js';
import { __Common } from './common.js';
import { __Date } from './date.js';
import { __Number } from './number.js';
import { __Object } from './object.js';
import { type PropValidationOptions } from './prop-options.js';
import { __String } from './string.js';

export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const type = getPropType(args[0], args[1]);
    const isArray = type?.name?.endsWith('Array') || options.isArray === true;

    const validationOptions: ValidationOptions = {
      each: isArray,
      groups: options.groups,
      validateIf: options.validateIf,
    };

    __Common(options, validationOptions)(...args);

    // Static values
    if (options.enum || options.isIn) {
      if (options.enum) {
        IsEnum(options.enum, validationOptions)(...args);
      } else if (options.isIn) {
        IsIn(options.isIn, validationOptions);
      } else if (options.isNotIn) {
        IsNotIn(options.isNotIn, validationOptions);
      }
    } else {
      switch (type.name) {
        case 'StringArray':
        case 'String': {
          __String(options, validationOptions)(...args);
          break;
        }
        case 'NumberArray':
        case 'Number': {
          __Number(options, validationOptions)(...args);
          break;
        }
        case 'BooleanArray':
        case 'Boolean': {
          __Boolean(options, validationOptions)(...args);
          break;
        }
        case 'DateArray':
        case 'Date': {
          __Date(options, validationOptions)(...args);
          break;
        }
        default: {
          __Object(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { ...options, type: () => type as ClassConstructor<any> },
            validationOptions,
          )(...args);
          break;
        }
      }
    }
  };
}
