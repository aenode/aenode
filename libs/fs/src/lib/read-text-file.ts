import { readFile } from 'node:fs/promises';

export function readTextFile(filePath: string, abortController?: AbortController) {
  return readFile(filePath, { encoding: 'utf-8', signal: abortController?.signal });
}
