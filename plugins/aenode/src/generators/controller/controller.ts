import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import type { ControllerGeneratorSchema } from './schema.js';

export async function controllerGenerator(
  tree: Tree,
  options: ControllerGeneratorSchema,
) {
  const projectConfig = readProjectConfiguration(tree, options.project);

  projectConfig.sourceRoot ??= path.join(projectConfig.root, 'src');
  generateFiles(
    tree,
    path.join(import.meta.dirname, 'files'),
    path.join(projectConfig.sourceRoot, 'app', 'resources'),
    { ...names(options.name) },
  );
  await formatFiles(tree);
}

export default controllerGenerator;
