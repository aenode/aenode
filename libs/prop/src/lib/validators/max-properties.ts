import { registerDecorator, type ValidationOptions } from 'class-validator';

export function MaxProperties(
  maxProperties: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'maxProperties',
      target: object.constructor,
      propertyName: propertyName as string,
      options: {
        ...validationOptions,
        message(args) {
          return `${args.property} should have at most ${maxProperties} properties`;
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
          return Object.keys(value).length <= maxProperties;
        },
      },
    });
  };
}
