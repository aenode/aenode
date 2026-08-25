import { Transform } from 'class-transformer';
import { type ValidationOptions, IsBoolean } from 'class-validator';

export function __PropBooleanValidation(
  validationOptions: ValidationOptions = {},
): PropertyDecorator {
  return (...args) => {
    const vo = validationOptions;
    IsBoolean(vo)(...args);

    Transform(({ value }) => {
      if (typeof value === 'string') {
        return value === 'true';
      }
      return value;
    })(...args);
  };
}
