import { readTextFile } from '../read/read-text-file.js';
import { writeTextFile } from '../write/write-text-file.js';

export async function updateTextFile(
  filepath: string,
  updateFn: (value: string) => string,
  abortController?: AbortController,
) {
  const currentValue = await readTextFile(filepath, abortController);
  const updatedValue = await updateFn(currentValue);
  await writeTextFile(filepath, updatedValue);
}
