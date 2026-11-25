import { writeFile } from 'node:fs/promises';

export function writeTextFile(filePath: string, content: string, abortController?: AbortController) {
  return writeFile(filePath, content, { encoding: 'utf-8', signal: abortController?.signal });
}
