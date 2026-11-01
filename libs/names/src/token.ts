import { names } from './names.js';

/**
 * Create constant case injection token from the given {@link args}
 *
 * @param args
 * @returns
 */
export function token(...args: string[]) {
  return args
    .map((e) => e.trim())
    .filter((e) => e)
    .map((a) => names(a).constant)
    .join('_');
}
