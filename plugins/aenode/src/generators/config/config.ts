import { formatFiles, generateFiles, getProjects, type Tree } from '@nx/devkit';
import { join } from 'node:path';

/**
 * Generate swc, eslint, tsconfig, and vitest configurations for the project.
 *
 * @param tree
 * @param options
 */
export async function configGenerator(tree: Tree) {
  const projects = getProjects(tree);

  for (const [name, project] of projects) {
    if (project.root === '' || project.root === '.' || !project.sourceRoot) {
      continue;
    }

    generateFiles(tree, join(import.meta.dirname, 'files'), project.root, {
      projectName: name,
    });
  }

  await formatFiles(tree);
}

export default configGenerator;
