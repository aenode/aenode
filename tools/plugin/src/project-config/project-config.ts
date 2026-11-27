import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import { join } from 'node:path';
import type { ProjectConfigGeneratorSchema } from './schema.js';

export async function projectConfigGenerator(
  tree: Tree,
  options: ProjectConfigGeneratorSchema,
) {
  const pc = readProjectConfiguration(tree, options.project);

  generateFiles(tree, join(import.meta.dirname, 'files'), pc.root, {
    projectName: pc.name,
    directory: pc.root,
  });

  formatFiles(tree);
}

export default projectConfigGenerator;
