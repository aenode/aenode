import { readFile } from 'node:fs/promises';

/**
 * Read text file
 *
 * @param filePath
 * @param abortController
 * @returns
 */
export async function readTextFile(filePath: string, abortController?: AbortController) {
  return await readFile(filePath, { encoding: 'utf-8', signal: abortController?.signal });
}
