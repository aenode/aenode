import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  type Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import type { ResolverGeneratorSchema } from './schema.js';

export async function resolverGenerator(
  tree: Tree,
  options: ResolverGeneratorSchema,
) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default resolverGenerator;
