import { access, rename as fsRename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { FileExistsError } from './errors/file-exists-error.js';

/**
 * Move the source file to the target file.
 *
 * @throws The {@link FileExistsError} when the {@link targetFilePath} file exists
 * @param sourceFilePath
 * @param targetFilePath
 */
export async function move(sourceFilePath: string, targetFilePath: string) {
  try {
    await access(targetFilePath);
    throw new FileExistsError(targetFilePath);
  } catch (error) {
    if (error instanceof FileExistsError) {
      throw error;
    }
  }

  await mkdir(dirname(targetFilePath), { recursive: true });
  await fsRename(sourceFilePath, targetFilePath);
}
