import { readdir } from 'node:fs/promises';

/**
 * List all directories/files under the {@link rootPath} recursively.
 * @param rootPath The directory to traverse
 * @returns list of Dirent objects
 */
export async function dirs(rootPath: string) {
  return await readdir(rootPath, { recursive: true, withFileTypes: true });
}
