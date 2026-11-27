import { access } from 'node:fs/promises';

export async function isFileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}
