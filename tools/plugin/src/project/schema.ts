import { names } from '@aenode/names';
import { basename } from 'node:path';

export type ProjectType = 'nest' | 'lib' | 'cli' | 'prisma';

export class ProjectGeneratorSchema {
  type: ProjectType = 'lib';
  directory: string;
  orgName: string;
  description = '- [ ] Add project description';
  authorName = 'Ahmet Emrebas';
  email = 'aenode+aenode@proton.me';
  profileUrl = 'https://aenode.github.io/#profile';
  fundingUrl = 'https://cash.app/$puqlib';
  homepageUrl: string;
  repositoryUrl: string;
  iconUrl: string;
  version = '0.0.1';
  projectName: string;
  names: ReturnType<typeof names>;
  aenodeVersion?: string;

  workspaceVersion: string;

  constructor(value: ProjectGeneratorSchema) {
    Object.assign(this, value);
    const shortName = basename(this.directory);

    this.names = names(shortName);
    this.orgName ??= 'aenode';

    this.homepageUrl = `${this.homepageUrl ?? 'https://aenode.github.io/aenode'}/${this.directory}`;
    this.repositoryUrl = `${this.repositoryUrl ?? 'https://github.com/aenode/aenode/tree/main'}/${this.directory}`;
    this.iconUrl = `${this.homepageUrl}/assets/favicon.svg`;

    if (!this.aenodeVersion) {
      this.aenodeVersion = 'workspace:*';
    }

    if (!this.email) {
      this.email = `aenode+${this.names.fileName}@proton.me`;
    } else {
      this.email = this.email.replace(
        '@',
        `+${this.orgName}-${this.names.fileName}@`,
      );
    }

    if (!this.projectName) {
      this.projectName = `@${this.orgName}/${this.names.fileName}`;
    }
  }
}
