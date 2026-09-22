import { formatFiles, generateFiles, type Tree } from '@nx/devkit';
import { join } from 'node:path';
import type { ProjectGeneratorSchema } from './schema.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const source = join(import.meta.dirname, 'files');

  generateFiles(tree, source, options.directory, options);
  await formatFiles(tree);
}

export default projectGenerator;
