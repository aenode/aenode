import { registerDecorator, type ValidationOptions } from 'class-validator';
import path from 'node:path';

export function IsRelativePath(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'isRelativePath',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;

          return !path.isAbsolute(value);
        },
      },
    });
  };
}
