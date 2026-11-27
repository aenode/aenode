import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { move, writeTextFile } from '../src/index.js';
import { isFileExists } from '../src/lib/is-file-exists.js';

describe('move', () => {
  const root = join(import.meta.dirname, 'tmp', 'move');
  const expectedContent = 'hello';
  const sourceFilePath = join(root, 'file.txt');
  const targetFilePath = join(root, 'target', 'new-file.txt');

  beforeAll(async () => {
    await writeTextFile(sourceFilePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    await move(sourceFilePath, targetFilePath);

    expect(await isFileExists(sourceFilePath)).toEqual(false);
    expect(await isFileExists(targetFilePath)).toEqual(true);
  });
});
