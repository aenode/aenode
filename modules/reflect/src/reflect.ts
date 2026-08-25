import type { ClassType } from '@aenode/types';
import 'reflect-metadata';

/**
 * Get property type from reflection (design:type)
 *
 * @param target target proto type
 * @param propertyKey
 * @returns
 */
export function getPropertyType(
  target: object,
  propertyKey: string | symbol,
): ClassType {
  const type = Reflect.getMetadata('design:type', target, propertyKey);

  return type.itemType ?? type;
}

/**
 * Get the return type of {@link methodName}
 * @key design:returntype
 * @param target
 * @param methodName
 * @returns
 */
export function getReturnType(
  target: object,
  methodName: string | symbol,
): ClassType[] {
  const type = Reflect.getMetadata('design:returntype', target, methodName);
  return type.itemType ?? type;
}

export function getParamTypes(
  target: object,
  methodName: string | symbol,
): ClassType[] {
  return Reflect.getMetadata('design:paramtypes', target, methodName);
}
