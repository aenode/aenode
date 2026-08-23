import 'reflect-metadata';

/**
 * Get the property type, (design:type), from reflect-metadata
 *
 * @param args
 * @returns
 */
export function getType(...args: [...Parameters<PropertyDecorator>]): any {
  return Reflect.getMetadata('design:type', ...args);
}
