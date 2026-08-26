export const ProjectType = {
  api: 'api',
  cli: 'cli',
  gql: 'gql',
  lib: 'lib',
  module: 'module',
  plugin: 'plugin',
  types: 'types',
  utils: 'utils',
  prisma: 'prisma',
};

export type ProjectType = keyof typeof ProjectType;

export interface ProjectGeneratorSchema {
  type: ProjectType;
  directory: string;
  orgName: string;
  funding: string;
  fullName: string;
  email: string;
  url: string;
  repoName: string;
  username: string;
}
