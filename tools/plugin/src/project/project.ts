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

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  options = new ProjectGeneratorSchema(options);

  // Generate the project type specific files
  generateByProjectType(tree, options);

  // Generate the common configuration files exluding the e2e projects
  switch (options.type) {
    case 'nest':
    case 'lib':
    case 'cli':
    case 'prisma': {
      generateCommonConfig(tree, options);
      break;
    }
    case 'nest-e2e': {
      break;
    }
  }

  switch (options.type) {
    case 'lib': {
      generateLibConfig(tree, options);
      break;
    }
    case 'prisma':
    case 'cli':
    case 'nest':
    case 'nest-e2e': {
      break;
    }
  }

  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];
    const projectPath = `./${options.directory}`;
    if (
      !value.references.find((e: { path: string }) => e.path === projectPath)
    ) {
      value.references.push({ path: projectPath });
    }
    return value;
  });

  installPackagesTask(tree, true);
  await formatFiles(tree);
}

export default projectGenerator;
