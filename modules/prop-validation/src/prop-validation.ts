import 'reflect-metadata';
//
import { RequiredOptionError } from '@aenode/errors';
import { isNotDefined } from '@aenode/is';
import type { PropValidationOptions } from '@aenode/prop-options';
import type { ClassType } from '@aenode/types';

export function normalizePropValidaitonOptions(
  target: Parameters<PropertyDecorator>[0],
  propertyKey: Parameters<PropertyDecorator>[1],
  options: PropValidationOptions = {},
): PropValidationOptions {
  if (isNotDefined(options.type)) {
    const inferedType = Reflect.getMetadata('design:type', target, propertyKey);

    if (inferedType) {
      options.type = () => inferedType as unknown as ClassType;
    } else {
      throw new RequiredOptionError(
        `The type option is required! The infered type is not a known typescript box type.`,
      );
    }
  }

  console.log(target, propertyKey);
  return { ...options };
}
export function PropValidation(
  options: PropValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    console.log(options, args);
    //
  };
}
