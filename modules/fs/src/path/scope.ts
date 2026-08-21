import { AccessDeniedError } from '@aenode/errors';
import { resolve as __resolve } from 'node:path';
import { normalize } from './normalize.js';

/**
 * Create a scoped resolver that resolves path segments and compre the absolute result with the {@link scopedPath}.
 * If absolute result not under the {@link scopedPath}, then it throws {@link AccessDeniedError}
 *
 * @param scopedPath scoped path.
 * @returns -- {@link ScopedResolver}
 */
export function scope(scopedPath: string): typeof __resolve {
  const scopeRoot = __resolve(normalize(scopedPath));

  return (...segments: string[]) => {
    const targetPath = __resolve(normalize(...segments));

    if (targetPath.startsWith(scopeRoot + '/') || targetPath === scopeRoot) {
      return targetPath;
    }

    throw new AccessDeniedError(
      `Path ${targetPath} is not under the scoped directory ${scopeRoot}`,
    );
  };
}
