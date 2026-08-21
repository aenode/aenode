import { writeTextFile } from './write-text-file.js';

export async function writeJsonFile<T>(filepath: string, content: T, abortController?: AbortController) {
    return await writeTextFile(filepath, JSON.stringify(content, undefined, 1), abortController);
}
