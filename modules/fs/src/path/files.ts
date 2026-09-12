import type { Dirent } from 'node:fs';
import { opendir } from 'node:fs/promises';
import { join } from 'node:path';

export type FilesOptions = { recursive?: boolean };

/**
 * High-performance, streaming directory traversal using Async Generators.
 * Memory footprint stays near zero regardless of whether there are 10 or 1,000,000 files.
 *
 * @param rootPath The directory to traverse
 */
export async function* files(
  rootPath: string,
  options?: FilesOptions,
): AsyncGenerator<Dirent> {
  const allDridents = await opendir(rootPath);

  for await (const drident of allDridents) {
    if (drident.isDirectory()) {
      // Recursively yield files from subdirectories without deep stacking arrays
      if (options?.recursive === true) {
        yield* files(join(rootPath, drident.name), options);
      }
    } else if (drident.isFile()) {
      // Immediately stream the file path out to the consumer
      yield drident;
    }
  }
}
