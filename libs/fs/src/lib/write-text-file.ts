import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { FileExistsError } from './errors/file-exists-error.js';
import { isFileExists } from './is-file-exists.js';

/**
 * Write text file
 *
 * @throws The {@link FileExistsError} when the {@link filePath} exists
 * @param filePath
 * @param content
 * @param abortController
 * @returns
 */
export async function writeTextFile(filePath: string, content: string, abortController?: AbortController) {
  if ((await isFileExists(filePath)) === true) {
    throw new FileExistsError(filePath);
  }
  await mkdir(dirname(filePath), { recursive: true });

  return writeFile(filePath, content, { encoding: 'utf-8', signal: abortController?.signal });
}
