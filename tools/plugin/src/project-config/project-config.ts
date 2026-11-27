import {
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import { inspect } from 'node:util';
import type { ProjectConfigGeneratorSchema } from './schema.js';

export async function projectConfigGenerator(
  tree: Tree,
  options: ProjectConfigGeneratorSchema,
) {
  const pc = readProjectConfiguration(tree, options.project);

  console.log(inspect(pc));
}

export default projectConfigGenerator;
