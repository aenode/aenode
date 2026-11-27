import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { readTextFile, writeTextFile } from '../src/index.js';

describe('readTextFile', () => {
  const root = join(import.meta.dirname, 'tmp', 'readTextFile');
  const expectedContent = 'hello';
  const filePath = join(root, 'file.txt');

  beforeAll(async () => {
    await writeTextFile(filePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    const content = await readTextFile(filePath);
    expect(content).toEqual(expectedContent);
  });
});
