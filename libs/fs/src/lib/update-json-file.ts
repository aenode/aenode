import { readJSONFile } from './read-json-file.js';
import { writeTextFile } from './write-text-file.js';

export async function updateJSONFile<T>(filePath: string, updateFn: (value: T) => unknown) {
  const jsonContent = await readJSONFile<T>(filePath);
  const updatedJsonContent = updateFn(jsonContent);

  await writeTextFile(filePath, JSON.stringify(updatedJsonContent));
}
