import { registerDecorator, type ValidationOptions } from 'class-validator';

export function NotWithout(
  properties: string[],
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object, propertyName) => {
    registerDecorator({
      name: 'notWithout',
      target: object.constructor,
      propertyName: propertyName as string,
      options: validationOptions,
      validator: {
        validate(value: unknown, args) {
          if (value !== undefined && value !== null) {
            return properties
              .map(
                (targetProperty: string) =>
                  (args?.object as { [targetProperty]: unknown })?.[
                    targetProperty
                  ],
              )
              .every(
                (targetValue) =>
                  targetValue !== undefined && targetValue !== null,
              );
          }
          return true;
        },
      },
    });
  };
}
