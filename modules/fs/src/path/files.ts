import type { Dirent } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { join } from 'node:path';

export type FilesOptions = { recursive?: boolean };

/**
 * High-performance, streaming directory traversal using Async Generators.
 * Memory footprint stays near zero regardless of whether there are 10 or 1,000,000 files.
 * @param rootPath The directory to traverse
 */
export async function* files(
  rootPath: string,
  options?: FilesOptions,
): AsyncGenerator<Dirent> {
  const dir = await opendir(rootPath);

  for await (const entry of dir) {
    const entryPath = join(rootPath, entry.name);

    if (entry.isDirectory()) {
      // Recursively yield files from subdirectories without deep stacking arrays
      if (options?.recursive === true) {
        yield* files(entryPath, options);
      }
    } else if (entry.isFile()) {
      // Immediately stream the file path out to the consumer
      yield entry;
    }
  }
}
