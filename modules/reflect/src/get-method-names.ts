export function getMethodNames<T extends { prototype: any }>(
  target: T,
): string[] {
  const prototype = target.prototype;

  return Object.getOwnPropertyNames(prototype).filter(
    (name) =>
      name !== 'constructor' &&
      typeof prototype[name as keyof T] === 'function',
  );
}
