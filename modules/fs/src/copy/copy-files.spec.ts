import { workspaceRoot } from '@nx/devkit';
import { join, relative } from 'node:path';
import { writeTextFile } from './../write/write-text-file.js';
import { copyFiles } from './copy-files.js';

describe('copyFiles', () => {
  const testRootDir = join(
    workspaceRoot,
    'tmp',
    'test',
    relative(workspaceRoot, __dirname),
  );
  const resolve = (...paths: string[]) => join(testRootDir, ...paths);

  beforeAll(async () => {
    await writeTextFile(resolve('source', 'first.txt'), 'first');
    await writeTextFile(resolve('source', 'second.txt'), 'second');
    await writeTextFile(resolve('source', 'sub', 'sub.txt'), 'sub');
  });
  afterAll(async () => {
    // await rm(testRootDir, { recursive: true });
  });
  it('should copy files', async () => {
    const result = copyFiles(resolve('source'), resolve('target'));

    for await (const r of result) {
      expect(r).toBeDefined();
    }
  });
});
