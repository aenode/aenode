import { rename as fsRename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { FileExistsError } from './errors/file-exists-error.js';
import { FileNotExistError } from './errors/file-not-exist-error.js';
import { isFileExists } from './is-file-exists.js';

/**
 * Move the source file to the target file.
 *
 * @throws The {@link FileExistsError} when the {@link targetFilePath} file exists
 * @param sourceFilePath
 * @param targetFilePath
 */
export async function move(sourceFilePath: string, targetFilePath: string) {
  if ((await isFileExists(targetFilePath)) === true) {
    throw new FileExistsError(targetFilePath);
  }

  if ((await isFileExists(sourceFilePath)) === false) {
    throw new FileNotExistError(sourceFilePath);
  }

  await mkdir(dirname(targetFilePath), { recursive: true });
  await fsRename(sourceFilePath, targetFilePath);
}
