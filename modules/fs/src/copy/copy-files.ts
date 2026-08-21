import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { files } from '../path/files.js';

/**
 * Copy files recursively by consuming a streaming files generator.
 * @param sourcePath Base source directory
 * @param targetPath Base destination directory
 * @param pipes Transformation functions for the destination path
 */
export async function* copyFiles(
  sourcePath: string,
  targetPath: string,
  ...fullFilePathPipe: ((fullFilePath: string) => string)[]
): AsyncGenerator<string, void, unknown> {
  // Consume the stream of file paths directly
  const foundFiles = files(sourcePath);

  for await (const entry of foundFiles) {
    const fullSourcePath = join(entry.parentPath, entry.name);
    const relativeSourcePath = relative(sourcePath, fullSourcePath);

    const fullTargetPath = fullFilePathPipe.reduce<string>(
      (acc, p) => {
        return p(acc);
      },
      join(targetPath, relativeSourcePath),
    );

    await mkdir(dirname(fullTargetPath), { recursive: true });
    await copyFile(fullSourcePath, fullTargetPath);
    yield fullTargetPath;
  }
}
