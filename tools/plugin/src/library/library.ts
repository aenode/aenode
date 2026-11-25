import { formatFiles, generateFiles, type Tree } from '@nx/devkit';
import * as path from 'path';
import type { LibraryGeneratorSchema } from './schema.js';

export async function libraryGenerator(tree: Tree, options: LibraryGeneratorSchema) {
  const projectRoot = `libs/${options.name}`;

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default libraryGenerator;
