import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  updateJson,
  type Tree,
} from '@nx/devkit';
import { basename, join, normalize } from 'node:path';
import type { LibraryGeneratorSchema } from './schema.js';

export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema,
) {
  const directory = `${normalize(options.directory)}`;
  const shortName = basename(directory);
  const projectName = `@aenode/${shortName}`;

  generateFiles(tree, join(import.meta.dirname, 'files'), directory, {
    projectName,
    directory,
    shortName,
  });

  updateJson(tree, 'tsconfig.json', (value) => {
    if (
      !value.references.find(
        (e: { path: string }) => e.path === directory,
      )
    ) {
      value.references.push({ path: directory });
    }
    return value;
  });

  installPackagesTask(tree, true);

  formatFiles(tree);
}

export default libraryGenerator;
