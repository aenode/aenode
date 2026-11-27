import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { isFileExists, writeTextFile } from '../src/index.js';

describe('isFileExists', () => {
  const root = join(import.meta.dirname, 'tmp', 'isFileExists');
  const expectedContent = 'hello';
  const sourceFilePath = join(root, 'file.txt');

  beforeAll(async () => {
    await writeTextFile(sourceFilePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    expect(await isFileExists(sourceFilePath)).toEqual(true);
  });
});
