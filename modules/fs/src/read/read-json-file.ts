import { readTextFile } from './read-text-file.js';

export async function readJsonFile<T>(filepath: string, abort?: AbortController): Promise<T> {
  const text = await readTextFile(filepath, abort);
  return JSON.parse(text) as T;
}
