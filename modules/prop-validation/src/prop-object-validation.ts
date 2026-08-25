import { RequiredPropertyError } from '@aenode/errors';
import { isNotDefined } from '@aenode/is';
import type { PropValidationOptions } from '@aenode/prop-options';
import { type ValidationOptions } from 'class-validator';

export function __PropObjectValidation(
  options: PropValidationOptions,
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return () => {
    if (isNotDefined(options.type)) {
      throw new RequiredPropertyError(
        `options.type is required for object tyeps.`,
      );
    }
  };
}
