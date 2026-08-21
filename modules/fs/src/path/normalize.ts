import { join } from 'node:path';

const sepexp = /[\\|/]{1,}/g;

/**
 * Normalize the path by replacing slashes with "/".
 * @param paths
 * @returns
 */
export function normalize(...paths: string[]) {
  return join(...paths).replace(sepexp, '/');
}
