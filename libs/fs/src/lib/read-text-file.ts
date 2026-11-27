import { readFile } from 'node:fs/promises';
import { FileNotExistError } from './errors/file-not-exist-error.js';
import { isFileExists } from './is-file-exists.js';

/**
 * Read text file
 *
 * @throws The {@link FileNotExistError}
 * @param filePath
 * @param abortController
 * @returns
 */
export async function readTextFile(filePath: string, abortController?: AbortController) {
  if ((await isFileExists(filePath)) === false) {
    throw new FileNotExistError(filePath);
  }

  return await readFile(filePath, { encoding: 'utf-8', signal: abortController?.signal });
}
