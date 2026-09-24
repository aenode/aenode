import { IsEnum, IsIn, type ValidationOptions } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { EnumValidationOptions } from './prop-options.js';

/**
 * Enum property validation decorator
 *
 * @param options enum validation options
 * @returns a property decorator
 */
export function PropEnum(options: EnumValidationOptions): PropertyDecorator {
  return (...args) => {
    __PropEnum(options)(...args);
  };
}

/**
 * Enum property validation decorator
 *
 * @param options enum validation options
 * @returns a property decorator
 */
export function __PropEnum(
  options: EnumValidationOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const inferedType = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: inferedType === Array,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    if (options.enum) {
      IsEnum(options.enum, validationOptions)(...args);
    } else if (options.isIn) {
      IsIn(options.isIn, validationOptions)(...args);
    } else {
      throw new Error(
        `${args[0].constructor.name}.${args[1].toString()} should provide enum or isIn option.`,
      );
    }
  };
}
