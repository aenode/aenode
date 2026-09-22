import {
  formatFiles,
  generateFiles,
  names,
  updateJson,
  workspaceRoot,
  type Tree,
} from '@nx/devkit';
import { readPackageJson } from '@nx/devkit/internal';
import { basename, join } from 'node:path';
import type { ProjectGeneratorSchema, ProjectType } from './schema.js';

async function normalizeOptions(options: ProjectGeneratorSchema) {
  const directory = join(options.directory);
  const sourcePath = join(import.meta.dirname, options.projectType);
  const targetPath = directory;
  const tags = createTags(options.projectType);

  const workspacePackage = await readPackageJson(workspaceRoot);
  const shortProjectName = basename(directory);
  const orgname =
    (workspacePackage.name as string).split('/').shift() ?? 'unknown';

  const projectName = `${orgname}/${shortProjectName}`;

  return {
    ...options,
    sourcePath,
    targetPath,
    ...names(shortProjectName),
    projectName,
    directory,
    tags,
  };
}

function upateTsconfig(tree: Tree, directory: string) {
  updateJson(tree, 'tsconfig.json', (value) => {
    value.references ??= [];
    const referencePath = `./${directory}`;
    if (
      !value.references.find((e: { path: string }) => e.path === referencePath)
    ) {
      value.references.push({ path: referencePath });
    }
    return value;
  });
}
function createTags(projectType: ProjectType) {
  switch (projectType) {
    case 'lib': {
      return 'lib:lib';
    }
    case 'nest': {
      return 'app:api';
    }
  }
}

async function commonGenerator(
  tree: Tree,
  options: Awaited<ReturnType<typeof normalizeOptions>>,
) {
  generateFiles(
    tree,
    join(import.meta.dirname, 'common'),
    options.targetPath,
    options,
  );
}
export async function projectGenerator(
  tree: Tree,
  options: ProjectGeneratorSchema,
) {
  const normalOptions = await normalizeOptions(options);

  const { directory, sourcePath, targetPath } = normalOptions;
  upateTsconfig(tree, directory);

  commonGenerator(tree, normalOptions);
  generateFiles(tree, sourcePath, targetPath, normalOptions);
  await formatFiles(tree);
}

export default projectGenerator;
