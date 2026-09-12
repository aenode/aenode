import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { files } from '../path/files.js';

export type CopyFilesOptions = {
  dry?: boolean;
};

/**
 * Copy files recursively by consuming a streaming files generator.
 *
 * @param sourcePath Base source directory
 * @param targetPath Base destination directory
 * @param pipes Transformation functions for the destination path
 */
export async function* copyFiles(
  sourcePath: string,
  targetPath: string,
  options: CopyFilesOptions = {},
): AsyncGenerator<string, void, unknown> {
  const sourceFilePaths = files(sourcePath);

  for await (const entry of sourceFilePaths) {
    const fullSourcePath = join(entry.parentPath, entry.name);
    const relativeSourcePath = relative(sourcePath, fullSourcePath);
    const fullTargetPath = join(targetPath, relativeSourcePath);
    const targetDirectoryPath = dirname(fullTargetPath);

    // Dry run
    if (options.dry) {
      console.log(`[DRY] created ${targetDirectoryPath} created`);
      console.log(`[DRY] copied ${fullSourcePath} to ${fullTargetPath}`);
      yield fullTargetPath;
      continue;
    }

    await mkdir(dirname(fullTargetPath), { recursive: true });
    await copyFile(fullSourcePath, fullTargetPath);
    yield fullTargetPath;
  }
}
