import { registerDecorator, type ValidationOptions } from 'class-validator';

export function MinProperties(
  minProperties: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'minProperties',
      target: object.constructor,
      propertyName: propertyName as string,
      options: {
        ...validationOptions,
        message(args) {
          return `${args.property} should have at least ${minProperties} properties`;
        },
      },
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'object') {
            return true;
          }

          if (value === undefined || value === null) {
            return true;
          }
          return Object.keys(value).length >= minProperties;
        },
      },
    });
  };
}
