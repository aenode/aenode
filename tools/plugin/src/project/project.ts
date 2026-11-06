import {
  formatFiles,
  generateFiles,
  installPackagesTask,
  updateJson,
  type Tree,
} from '@nx/devkit';
import * as path from 'node:path';
import { ProjectGeneratorSchema } from './schema.js';

export function generateCommonConfig(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  generateFiles(
    tree,
    path.join(import.meta.dirname, 'config', 'common'),
    options.directory,
    { ...options, ...options.names },
  );
}

export function generateLibConfig(tree: Tree, options: ProjectGeneratorSchema) {
  generateFiles(
    tree,
    path.join(import.meta.dirname, 'config', 'lib'),
    options.directory,
    { ...options, ...options.names },
  );
}

export function generateByProjectType(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  generateFiles(
    tree,
    path.join(import.meta.dirname, options.type),
    options.directory,
    { ...options, ...options.names },
  );
}

export function generateNestE2eProject(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  generateFiles(
    tree,
    path.join(import.meta.dirname, 'nest-e2e'),
    options.directory + '-e2e',
    { ...options, ...options.names },
  );
}

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  options = new ProjectGeneratorSchema(options);

  // Generate the common configuration files exluding the e2e projects
  generateCommonConfig(tree, options);

  // Generate the project type specific files
  generateByProjectType(tree, options);

  if (options.type === 'lib') {
    generateLibConfig(tree, options);
  }

  if (options.type === 'nest') {
    generateNestE2eProject(tree, options);
  }

  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];
    const projectPath = `./${options.directory}`;
    const e2eProjectPath = projectPath + '-e2e';
    if (
      !value.references.find((e: { path: string }) => e.path === projectPath)
    ) {
      value.references.push({ path: projectPath });
    }

    if (options.type === 'nest') {
      if (
        !value.references.find(
          (e: { path: string }) => e.path === e2eProjectPath,
        )
      ) {
        value.references.push({ path: e2eProjectPath });
      }
    }
    return value;
  });

  installPackagesTask(tree, true);
  await formatFiles(tree);
}

export default projectGenerator;
