import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  type Tree
} from '@nx/devkit';
import * as path from 'node:path';
import type { ConfigGeneratorSchema } from './schema.js';

/**
 * Generate swc, eslint, tsconfig, and vitest configurations for the project.
 * 
 * @param tree 
 * @param options 
 */
export async function configGenerator(
  tree: Tree,
  options: ConfigGeneratorSchema,
) {

  const config = readProjectConfiguration(tree, options.project);

  const projectName = config.name;

  generateFiles(tree, path.join(__dirname, 'files'), config.root, { projectName });
  await formatFiles(tree);
}

export default configGenerator;
