import { readTextFile } from './read-text-file.js';

export async function readJSONFile<T>(filePath: string, abortController?: AbortController): Promise<T> {
  const content = await readTextFile(filePath, abortController);
  return JSON.parse(content) as T;
}
