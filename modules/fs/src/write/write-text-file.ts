import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function writeTextFile(filepath: string, content: string, abortController?: AbortController) {
    await mkdir(dirname(filepath), { recursive: true });
    return await writeFile(filepath, content, { encoding: 'utf-8', signal: abortController?.signal });
}
