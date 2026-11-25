import { writeTextFile } from './write-text-file.js';

export async function writeJSONFile<T>(filePath: string, data: T, abortController?: AbortController) {
  const textContent = JSON.stringify(data, undefined, 2);
  return await writeTextFile(filePath, textContent, abortController);
}
