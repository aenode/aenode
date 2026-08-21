import { dump } from 'js-yaml';
import { writeTextFile } from './write-text-file.js';

export async function writeYamlFile<T>(
  filepath: string,
  content: T,
  abortController?: AbortController,
) {
  return await writeTextFile(filepath, dump(content), abortController);
}
