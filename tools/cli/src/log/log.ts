import { appendFile, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const LOG_FILE_PATH = join(
  tmpdir(),
  'aenode-cli-history-logs-1298749812764.log',
);

export async function writeLog(mesage: string) {
  await appendFile(LOG_FILE_PATH, `\n${mesage} [${new Date().toISOString()}]`);
}

export async function readLogs() {
  const logs = await readFile(LOG_FILE_PATH, { encoding: 'utf-8' });

  const indexedLogs = logs
    .split('\n')
    .map((e) => e.trim())
    .filter((e) => e)
    .map((e, i) => `${String(i + 1).padEnd(5)}${e}`)
    .join('\n');

  return indexedLogs;
}

export async function clearLogs() {
  return await writeFile(LOG_FILE_PATH, '');
}
