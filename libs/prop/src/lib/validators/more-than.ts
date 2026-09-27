import { registerDecorator, type ValidationOptions } from 'class-validator';

export function MoreThan(
  properties: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'moreThan',
      target: object.constructor,
      propertyName: propertyName as string,
      options: {
        ...validationOptions,
        message(args) {
          return `${args.property} should be more than ${properties.join(', ')}`;
        },
      },
      validator: {
        validate(value: unknown, args) {
          if (value !== undefined && value !== null) {
            return properties
              .map((e: string) => (args?.object as { [e]: unknown })?.[e])
              .filter((e) => e !== undefined && e !== null)
              .every((e) => value > e);
          }
          return true;
        },
      },
    });
  };
}
