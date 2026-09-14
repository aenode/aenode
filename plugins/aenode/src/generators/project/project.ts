import { brandEmail } from '@aenode/brand-email';
import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  type Tree,
} from '@nx/devkit';
import { basename, join, normalize } from 'node:path';

import { packageVersion, rootProjectVersion } from '../../helpers/index.js';
import type { ProjectGeneratorSchema } from './schema.js';

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const name = basename(options.directory);

  options.directory = normalize(options.directory);
  const projectName = `@${options.orgName}/${name}`;

  options.email = brandEmail(options.email, name);

  const configSource = join(import.meta.dirname, 'templates', 'config');

  const source = join(import.meta.dirname, 'templates', options.type);
  const target = normalize(options.directory);

  const aenodeVersion =
    options.orgName === 'aenode'
      ? 'workspace'
      : packageVersion('@aenode/aenode');

  const tag = (() => {
    switch (options.type) {
      case 'api':
      case 'plugin':
      case 'cli':
      case 'prisma':
      case 'gql': {
        return `app:${options.type}`;
      }
      case 'lib': {
        return `lib:${options.type}`;
      }
      case 'module': {
        return `lib:module`;
      }
      case 'types': {
        return `lib:${options.type}`;
      }
      case 'utils': {
        return `lib:${options.type}`;
      }
    }
  })();

  const allNames = names(name);

  const version = options.version ?? (await rootProjectVersion());

  // Generate common files
  generateFiles(tree, configSource, target, {
    ...options,
    projectName,
    tag,
    ...allNames,
    name,
    aenodeVersion,
    version,
  });

  // Generate specific files
  generateFiles(tree, source, target, {
    ...options,
    projectName,
    tag,
    ...allNames,
    name,
    version,
  });

  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];

    const referencePath = `./${options.directory}`;
    if (
      !value.references.find((e: { path: string }) => e.path === referencePath)
    ) {
      value.references.push({
        path: referencePath,
      });
    }

    return value;
  });
  formatFiles(tree);
}

export default projectGenerator;
