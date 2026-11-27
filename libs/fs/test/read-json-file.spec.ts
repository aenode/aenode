import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { readJSONFile, writeJSONFile } from '../src/index.js';

describe('readJSONFile', () => {
  const root = join(import.meta.dirname, 'tmp', 'readJSONFile');
  const expectedContent = { message: 'hello' };
  const filePath = join(root, 'file.txt');

  beforeAll(async () => {
    await writeJSONFile(filePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    const content = await readJSONFile(filePath);

    expect(content).toEqual(expectedContent);
  });
});
