import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsOptional, type ValidationOptions } from 'class-validator';
import type { PropValidationOptions } from './prop-options.js';

export function __Common(
  options: PropValidationOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.required === true) {
      IsDefined()(...args);
    } else {
      IsOptional()(...args);
    }

    Expose({ groups: options.groups })(...args);

    if (options.default !== undefined) {
      Transform(({ value }) => {
        if (value === undefined || value === null) {
          return options.default;
        }
        return value;
      })(...args);
    }
    return args;
  };
}
