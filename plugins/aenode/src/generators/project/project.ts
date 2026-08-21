import { formatFiles, generateFiles, type Tree } from '@nx/devkit';
import { basename, dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ProjectGeneratorSchema } from './schema.js';

const __dirname = dirname(fileURLToPath(import.meta.filename));

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const name = basename(options.directory);
  options.directory = normalize(options.directory);
  const projectName = `@${options.orgName}/${name}`;

  const source = join(__dirname, options.type);

  const target = normalize(options.directory);
  generateFiles(tree, source, target, { ...options, projectName });

  formatFiles(tree);
}

export default projectGenerator;
