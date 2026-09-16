import 'reflect-metadata';

/**
 * Get property type from reflection (design:type)
 *
 * @param target target proto type
 * @param propertyKey
 * @returns
 */
export function getPropType(
  target: object,
  propertyKey: string | symbol,
): { name: string } {
  const type = Reflect.getMetadata('design:type', target, propertyKey);
  if (type === undefined) {
    throw new Error('Could not resolve type');
  }
  return type;
}

/**
 * Get the return type of {@link methodName}
 *
 * @key design:returntype
 * @param target
 * @param methodName
 * @returns
 */
export function getReturnType(target: object, methodName: string | symbol) {
  return Reflect.getMetadata('design:returntype', target, methodName);
}

export function getParamType(target: object, methodName: string | symbol) {
  return Reflect.getMetadata('design:paramtypes', target, methodName);
}

export function getMethodNames<T extends { prototype: object }>(
  target: T,
): string[] {
  const names = new Set<string>();

  let prototype = target.prototype;

  while (prototype && prototype !== Object.prototype) {
    for (const name of Object.getOwnPropertyNames(prototype)) {
      if (
        name !== 'constructor' &&
        typeof Object.getOwnPropertyDescriptor(prototype, name)?.value ===
          'function'
      ) {
        names.add(name);
      }
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return [...names];
}

export function getMethodDescriptor(
  target: object,
  methodName: string | symbol,
): PropertyDescriptor | undefined {
  let prototype: object | null = target;

  while (prototype && prototype !== Object.prototype) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, methodName);

    if (descriptor) {
      return descriptor;
    }

    prototype = Reflect.getPrototypeOf(prototype);
  }

  return undefined;
}

export function getPropertyNames<T extends { prototype: object }>(
  target: T,
): string[] {
  const names = new Set<string>();

  let prototype = target.prototype;

  while (prototype && prototype !== Object.prototype) {
    for (const name of Object.getOwnPropertyNames(prototype)) {
      if (name === 'constructor') {
        continue;
      }

      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);

      if (descriptor && typeof descriptor.value !== 'function') {
        names.add(name);
      }
    }

    prototype = Object.getPrototypeOf(prototype);
  }

  return [...names];
}
