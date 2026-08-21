import { readYamlFile } from '../read/read-yaml-file.js';
import { writeYamlFile } from '../write/write-yaml-file.js';

export async function updateYamlFile<T>(
    filepath: string,
    updateFn: (value: T) => T,
    abortController?: AbortController,
) {
    const currentValue = await readYamlFile<T>(filepath, abortController);
    const updatedValue = await updateFn(currentValue);
    await writeYamlFile<T>(filepath, updatedValue);
}
