import { brandEmail } from '@aenode/brand-email';
import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  type Tree,
} from '@nx/devkit';
import { basename, dirname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageVersion } from '../../helpers/index.js';
import type { ProjectGeneratorSchema } from './schema.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const name = basename(options.directory);
  options.directory = normalize(options.directory);
  const projectName = `@${options.orgName}/${name}`;

  options.email = brandEmail(options.email, name);

  const commonSource = join(__dirname, 'templates', 'common');
  const source = join(__dirname, 'templates', options.type);
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

  // Generate common files
  generateFiles(tree, commonSource, target, {
    ...options,
    projectName,
    tag,
    ...allNames,
    name,
    aenodeVersion,
  });

  // Generate specific files
  generateFiles(tree, source, target, {
    ...options,
    projectName,
    tag,
    ...allNames,
    name,
    aenodeVersion,
  });

  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];

    const referencePath = `./${options.directory}`;
    if (!value.references.find((e: any) => e.path === referencePath)) {
      value.references.push({
        path: referencePath,
      });
    }

    return value;
  });
  formatFiles(tree);
}

export default projectGenerator;
