import { registerDecorator } from 'class-validator';

export function NotWith(properties: string[]): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'notWith',
      target: object.constructor,
      propertyName: propertyName as string,
      options: {
        message(args) {
          return `${args.property} cannot be used together with ${properties.join(', ')}`;
        },
      },
      validator: {
        validate(value: unknown, args) {
          if (value !== undefined && value !== null) {
            return !properties
              .map((e: string) => (args?.object as { [e]: unknown })?.[e])
              .some((e) => e !== undefined && e !== null);
          }
          return true;
        },
      },
    });
  };
}
