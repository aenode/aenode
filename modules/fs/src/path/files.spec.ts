import { workspaceRoot } from '@nx/devkit';
import { join } from 'node:path';
import { describe, it } from 'vitest';
import { files } from './files.js';

describe('files', () => {
  it('shold list files', async () => {
    console.log('Startting....');

    for await (const file of files(join(workspaceRoot, 'tmp'), {
      recursive: true,
    })) {
      console.log(file);
      console.log(file.parentPath, file.name);
    }
  });
});
