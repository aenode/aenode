import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import { join } from 'node:path';
import type { LibraryGeneratorSchema } from './schema.js';

export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema,
) {
  const pc = readProjectConfiguration(tree, options.project);

  generateFiles(tree, join(import.meta.dirname, 'files'), pc.root, {
    projectName: pc.name,
    directory: pc.root,
  });

  formatFiles(tree);
}

export default libraryGenerator;
