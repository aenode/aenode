import { readJSONFile } from './read-json-file.js';
import { writeTextFile } from './write-text-file.js';

/**
 * Update json file
 *
 * @throws The {@link FileNotExistError} when the {@link filePath} does not exist
 * @param filePath
 * @param updateFn
 */
export async function updateJSONFile<T>(filePath: string, updateFn: (value: T) => Promise<unknown> | unknown) {
  const jsonContent = await readJSONFile<T>(filePath);
  const updatedJsonContent = await updateFn(jsonContent);

  await writeTextFile(filePath, JSON.stringify(updatedJsonContent));
}
