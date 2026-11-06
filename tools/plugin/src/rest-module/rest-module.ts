import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import type { RestModuleGeneratorSchema } from './schema.js';

export async function restModuleGenerator(
  tree: Tree,
  options: RestModuleGeneratorSchema,
) {
  const projectConfiguration = readProjectConfiguration(tree, options.project);

  const projectSrcRoot = (projectConfiguration.sourceRoot ??=
    projectConfiguration.root + '/src');

  for (const name of options.name) {
    const sourceNames = names(name);

    const targetRoot = path.join(projectSrcRoot, 'api', sourceNames.fileName);

    generateFiles(tree, path.join(import.meta.dirname, 'files'), targetRoot, {
      ...sourceNames,
      project: options.project,
    });
  }
  await formatFiles(tree);
}

export default restModuleGenerator;
