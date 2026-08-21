import { load } from 'js-yaml';
import { readTextFile } from './read-text-file.js';

export async function readYamlFile<T>(filepath: string, abort?: AbortController) {
  const text = await readTextFile(filepath, abort);
  return load(text) as T;
}
