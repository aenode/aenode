import { appendFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export async function appendTextFile(filepath: string, content: string) {
    await mkdir(dirname(filepath), { recursive: true });
    await appendFile(filepath, content, {
        encoding: 'utf-8',
    });
}
