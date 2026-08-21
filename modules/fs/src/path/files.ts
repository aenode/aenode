import { type Dirent } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { join } from 'node:path';

// /**
//  * List all file paths under the {@link rootPath} recursively
//  * @param rootPath
//  * @returns
//  */
// export async function files(rootPath: string): Promise<Dirent[]> {
//   const foundDirs = await dirs(rootPath);
//   return foundDirs.filter((e) => e.isFile());
// }

/**
 * High-performance, streaming directory traversal using Async Generators.
 * Memory footprint stays near zero regardless of whether there are 10 or 1,000,000 files.
 * @param rootPath The directory to traverse
 */
export async function* files(rootPath: string): AsyncGenerator<Dirent> {
  let dir;
  try {
    // opendir streams directory entries instead of loading them all at once
    dir = await opendir(rootPath);
  } catch (err) {
    // Handle or ignore permission errors/missing folders
    return;
  }

  for await (const entry of dir) {
    const entiryPath = join(rootPath, entry.name);

    if (entry.isDirectory()) {
      // Recursively yield files from subdirectories without deep stacking arrays
      yield* files(entiryPath);
    } else if (entry.isFile()) {
      // Immediately stream the file path out to the consumer
      yield entry;
    }
  }
}
