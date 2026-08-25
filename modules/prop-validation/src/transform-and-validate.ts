import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';
import { globalClassTransformOptions } from './global-transformer-options.js';
import { globalValidatorOptions } from './global-validator-options.js';

export function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: T,
): ValidationError[] {
  const instance = plainToInstance(type, value, globalClassTransformOptions);

  console.log(instance);
  const errors = validateSync(instance, globalValidatorOptions);
  return errors;
}
