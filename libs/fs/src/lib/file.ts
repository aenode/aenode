import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function File(filePath: string, encoding: BufferEncoding = 'utf8'): PropertyDecorator {
  return (target, propertyKey) => {
    const absolutePath = resolve(filePath);
    let cache: string | undefined;

    Object.defineProperty(target, propertyKey, {
      get() {
        return (cache ??= readFileSync(absolutePath, encoding));
      },
      enumerable: true,
      configurable: true,
    });
  };
}
