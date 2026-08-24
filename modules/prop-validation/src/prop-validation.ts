import 'reflect-metadata';
//
import { RequiredOptionError } from '@aenode/errors';
import { isDefined, isNotDefined } from '@aenode/is';
import type { PropValidationOptions } from '@aenode/prop-options';
import { getType } from '@aenode/reflect';
import type { ClassType } from '@aenode/types';
import {
  IsArray,
  IsDefined,
  IsOptional,
  type ValidationOptions,
} from 'class-validator';
import { __PropStringValidation } from './prop-string-validation.js';

export function normalizePropValidaitonOptions(
  options: PropValidationOptions = {},
  target: Parameters<PropertyDecorator>[0],
  propertyKey: Parameters<PropertyDecorator>[1],
): PropValidationOptions {
  if (isNotDefined(options.type)) {
    const inferedType = getType(target, propertyKey);

    if (inferedType) {
      options.type = () => inferedType as unknown as ClassType;
      options.typeName = inferedType.name;
    } else {
      throw new RequiredOptionError(
        `The type option is required! The infered type is not a known typescript box type.`,
      );
    }
  }

  return { ...options };
}
export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    options = normalizePropValidaitonOptions(options, ...args);
    const vo: ValidationOptions = { each: options.isArray };

    if (options.isRequired === true) {
      IsDefined()(...args);
    } else {
      IsOptional()(...args);
    }

    if (options.isArray) {
      IsArray()(...args);
    }

    if (isDefined(options.typeName))
      switch (options.typeName) {
        case 'Json':
        case 'String': {
          __PropStringValidation(options, vo)(...args);
          break;
        }
        case 'Number':
        case 'Boolean':
        case 'Date':
        case 'Buffer':
        case 'Object': {
          break;
        }
      }
  };
}
