import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import type { PrismaModuleGeneratorSchema } from './schema.js';

export async function prismaModuleGenerator(
  tree: Tree,
  options: PrismaModuleGeneratorSchema,
) {
  const projectConfiguration = readProjectConfiguration(tree, options.project);

  const projectSrcRoot = (projectConfiguration.sourceRoot ??=
    projectConfiguration.root + '/src');

  for (const name of options.name) {
    const sourceNames = names(name);

    const targetRoot = path.join(projectSrcRoot, 'data', sourceNames.fileName);

    generateFiles(tree, path.join(import.meta.dirname, 'files'), targetRoot, {
      ...sourceNames,
      project: options.project,
    });
  }
  await formatFiles(tree);
}

export default prismaModuleGenerator;
