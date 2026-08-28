import { NotFoundError } from '@aenode/errors';
import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
  type Tree,
} from '@nx/devkit';
import { fileURLToPath } from 'node:url';
import type { ResolverGeneratorSchema } from './schema.js';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function resolverGenerator(
  tree: Tree,
  options: ResolverGeneratorSchema,
) {
  const foundProject = readProjectConfiguration(tree, options.project);
  if (!foundProject.sourceRoot) {
    throw new NotFoundError(
      `sourceRoot configuration is not set for the project ${options.project}`,
    );
  }

  const sourceDirectory = path.join(__dirname, 'files');
  const targetDirectory = joinPathFragments(
    foundProject.sourceRoot,
    options.directory,
  );

  generateFiles(tree, sourceDirectory, targetDirectory, {
    ...names(options.name),
  });
  await formatFiles(tree);
}

export default resolverGenerator;
