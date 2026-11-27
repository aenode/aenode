import { rename as fsRename } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { FileExistsError } from './errors/file-exists-error.js';
import { FileNotExistError } from './errors/file-not-exist-error.js';
import { isFileExists } from './is-file-exists.js';

/**
 * Rename the {@link filePath}'s file name by the {@link newFileName}
 *
 * @throws The {@link FileExistsError} when the {@link newFileName} file exists
 * @param filePath
 * @param newFileName
 */
export async function rename(filePath: string, newFileName: string) {
  if ((await isFileExists(filePath)) === false) {
    throw new FileNotExistError(filePath);
  }

  const newFilePath = join(dirname(filePath), newFileName);

  if (await isFileExists(newFilePath)) {
    throw new FileExistsError(newFilePath);
  }

  await fsRename(filePath, newFilePath);
}
