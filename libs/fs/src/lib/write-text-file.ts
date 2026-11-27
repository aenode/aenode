import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function writeTextFile(filePath: string, content: string, abortController?: AbortController) {
  try {
    await access(dirname(filePath));
  } catch {
    await mkdir(dirname(filePath), { recursive: true });
  }
  return writeFile(filePath, content, { encoding: 'utf-8', signal: abortController?.signal });
}
