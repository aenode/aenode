import { fail } from 'node:assert';
import { rm } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { FileExistsError, FileNotExistError, isFileExists, rename, writeTextFile } from '../src/index.js';

describe('rename', () => {
  const root = join(import.meta.dirname, 'tmp', 'rename');
  const expectedContent = 'hello';
  const staticFilePath = join(root, 'static-file.txt');
  const sourceFilePath = join(root, 'file.txt');
  const newFileName = 'new-file-name.txt';

  beforeAll(async () => {
    await writeTextFile(sourceFilePath, expectedContent);
    await writeTextFile(staticFilePath, expectedContent);
  });

  afterAll(async () => {
    await rm(root, { recursive: true });
  });

  it('should read', async () => {
    await rename(sourceFilePath, newFileName);

    expect(await isFileExists(sourceFilePath)).toEqual(false);
    expect(await isFileExists(join(dirname(sourceFilePath), newFileName))).toEqual(true);
  });

  it('should throw if the source file does not exist', () => {
    rename('none/existing/file-path.txt', '')
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(FileNotExistError));
  });

  it('should throw if the target file exists', () => {
    rename(staticFilePath, basename(staticFilePath))
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(FileExistsError));
  });
});
