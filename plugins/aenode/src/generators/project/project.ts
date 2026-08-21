import { formatFiles, generateFiles, updateJson, type Tree } from '@nx/devkit';
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

  const tag = (() => {
    switch (options.type) {
      case 'api':
      case 'plugin':
      case 'cli':
      case 'gql': {
        return `app:${options.type}`;
      }
      case 'lib': {
        return `lib:${options.type}`;
      }
      case 'module': {
        return `lib:${options.type}`;
      }
      case 'types': {
        return `lib:${options.type}`;
      }
      case 'utils': {
        return `lib:${options.type}`;
      }
    }
  })();

  generateFiles(tree, source, target, { ...options, projectName, tag });

  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];

    value.references.push({
      path: `./${options.directory}`,
    });

    return value;
  });
  formatFiles(tree);
}

export default projectGenerator;
