import { readJsonFile } from '../read/read-json-file.js';
import { writeJsonFile } from '../write/write-json-file.js';

export async function updateJsonFile<T>(
    filepath: string,
    updateFn: (value: T) => T,
    abortController?: AbortController,
) {
    const currentValue = await readJsonFile<T>(filepath, abortController);
    const updatedValue = await updateFn(currentValue);
    await writeJsonFile<T>(filepath, updatedValue);
}
