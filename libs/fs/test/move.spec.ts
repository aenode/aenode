import { fail } from 'node:assert';
import { rm } from 'node:fs/promises';
import { join } from 'node:path';
import { FileExistsError, FileNotExistError, move, writeTextFile } from '../src/index.js';
import { isFileExists } from '../src/lib/is-file-exists.js';

describe('move', () => {
  const root = join(import.meta.dirname, 'tmp', 'move');
  const expectedContent = 'hello';
  const staticFilePath = join(root, 'static.txt');
  const sourceFilePath = join(root, 'file.txt');
  const targetFilePath = join(root, 'target', 'new-file.txt');

  beforeAll(async () => {
    await writeTextFile(staticFilePath, expectedContent);
    await writeTextFile(sourceFilePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should move', async () => {
    await move(sourceFilePath, targetFilePath);

    expect(await isFileExists(sourceFilePath)).toEqual(false);
    expect(await isFileExists(targetFilePath)).toEqual(true);
  });

  it('should throw if source file does not exist', () => {
    move('none/exising/file-path.txt', '')
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(FileNotExistError));
  });

  it('should throw if the target file exist', () => {
    move(staticFilePath, staticFilePath)
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(FileExistsError));
  });
});
