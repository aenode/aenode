import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, type ValidationOptions } from 'class-validator';
import type { PropValidationOptions } from './prop-options.js';

export function __Common(
  options: PropValidationOptions,
  _validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    if (options.required === true) {
      IsDefined()(...args);
    } else {
      IsOptional()(...args);
    }

    Expose({ groups: options.groups })(...args);
    return args;
  };
}
