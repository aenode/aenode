import { type Tree } from '@nx/devkit';
import type { LibraryGeneratorSchema } from './schema.js';

export async function libraryGenerator(tree: Tree, options: LibraryGeneratorSchema) {
  console.log('Generate a library project', options, tree.root);
}

export default libraryGenerator;
