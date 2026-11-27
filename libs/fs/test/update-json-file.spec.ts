import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { readJSONFile, updateJSONFile, writeJSONFile } from '../src/index.js';

describe('updateJSONFile', () => {
  const root = join(import.meta.dirname, 'tmp', 'updateJSONFile');
  const expectedContent = { message: 'hello' };
  const updatedContent = { message: 'upated' };
  const sourceFilePath = join(root, 'file.json');

  beforeAll(async () => {
    await writeJSONFile(sourceFilePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    await updateJSONFile(sourceFilePath, () => {
      return updatedContent;
    });

    const newContent = await readJSONFile(sourceFilePath);
    expect(newContent).toEqual(updatedContent);
  });
});
