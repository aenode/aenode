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

export function generateLib(tree: Tree, options: ProjectGeneratorSchema) {
  generateFiles(
    tree,
    path.join(import.meta.dirname, 'lib'),
    options.directory,
    { ...options, ...options.names },
  );
}

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  options = new ProjectGeneratorSchema(options);

  generateCommonConfig(tree, options);

  switch (options.type) {
    case 'lib': {
      generateLibConfig(tree, options);
      generateLib(tree, options);
      break;
    }

    case 'nest':
    case 'cli':
    case 'prisma': {
      throw new Error('not implemented');
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
