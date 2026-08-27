import { workspaceRoot } from '@nx/devkit';
import { resolve } from 'node:path';
import { files } from './files.js';
describe('files', () => {
  it('shold list files', async () => {
    console.log('Startting....');
    for await (const file of files(resolve(workspaceRoot, 'tmp'), {
      recursive: true,
    })) {
      console.log(file);
      console.log(file.parentPath, file.name);
    }
  });
});
