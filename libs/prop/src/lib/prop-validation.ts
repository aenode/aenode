import { IsArray } from 'class-validator';
import 'reflect-metadata';
import { __PropBoolean } from './prop-boolean.js';
import { __PropDate } from './prop-date.js';
import { __PropEnum } from './prop-enum.js';
import { __PropNumber } from './prop-number.js';
import { __PropObject } from './prop-object.js';
import {
  type PropBooleanOptions,
  type PropDateOptions,
  type PropEnumOptions,
  type PropNumberOptions,
  type PropObjectOptions,
  type PropStringOptions,
  type PropValidationOptions,
} from './prop-options.js';
import { __PropString } from './prop-string.js';

/**
 * DTO class property validation decorator.
 *
 * @important for circler objects use ProjectObjectValidation decorator.
 * @param options validation options {@link PropValidationOptions}
 * @returns a property decorator
 */
export function PropValidation(
  options?: PropValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};

    const inferedType = Reflect.getMetadata('design:type', ...args);
    const isArrayType = inferedType === Array;
    const isUnkownObject = inferedType === Object;
    const propertyDef = `${args[0].constructor.name}.${args[1].toString()} is ${inferedType}: `;

    console.debug(`${propertyDef}`, PropValidation.name);
    ArrayORUnkownObjectShouldProvideTypeOrEnumOrIsIn: {
      if (isArrayType || isUnkownObject) {
        if (isArrayType) {
          IsArray()(...args);
        }
        if (
          !options.type &&
          !(options as PropEnumOptions).enum &&
          !(options as PropEnumOptions).isIn
        ) {
          throw new Error(
            `${propertyDef} does not provide type, enum, or isIn option`,
          );
        }
      } else {
        options.type ??= inferedType;
      }

      break ArrayORUnkownObjectShouldProvideTypeOrEnumOrIsIn;
    }

    const validationOptions = {
      each: isArrayType,
      groups: options?.groups,
    };

    IfPropertyHasEnumOrIsInOptionThenApplyEnumDecorator: {
      if (options.enum || options.isIn) {
        __PropEnum(options as PropEnumOptions, validationOptions)(...args);
        return;
      }
      break IfPropertyHasEnumOrIsInOptionThenApplyEnumDecorator;
    }

    switch (options.type) {
      case String: {
        __PropString(options as PropStringOptions, validationOptions)(...args);
        break;
      }
      case Number: {
        __PropNumber(options as PropNumberOptions, validationOptions)(...args);
        break;
      }
      case Boolean: {
        __PropBoolean(
          options as PropBooleanOptions,
          validationOptions,
        )(...args);
        break;
      }
      case Date: {
        __PropDate(options as PropDateOptions, validationOptions)(...args);
        break;
      }

      default: {
        __PropObject(options as PropObjectOptions, validationOptions)(...args);

        break;
      }
    }
  };
}
