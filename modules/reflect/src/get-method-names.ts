import type { ClassType } from '@aenode/types';

export function getMethodNames<T>(target: ClassType<T>) {
  return Object.getOwnPropertyNames(target.prototype).filter(
    (name) =>
      name !== 'constructor' &&
      typeof target.prototype[name as keyof typeof target] === 'function',
  );
}
