import { formatFiles, generateFiles, updateJson, type Tree } from '@nx/devkit';
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

  generateByProjectType(tree, options);

  switch (options.type) {
    case 'nest-e2e': {
      break;
    }
    case 'lib': {
      generateCommonConfig(tree, options);
      generateLibConfig(tree, options);
      break;
    }
    case 'cli':
    case 'prisma': {
      throw new Error('not implemented');
    }
    case 'nest': {
      generateCommonConfig(tree, options);
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

  await formatFiles(tree);
}

export default projectGenerator;
