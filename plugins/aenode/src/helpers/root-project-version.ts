import { readJsonFile } from '@aenode/fs';
import { workspaceRoot } from '@nx/devkit';
import { join } from 'node:path';

export async function rootProjectVersion() {
  const packgeJson = await readJsonFile<{ version: string }>(
    join(workspaceRoot, 'package.json'),
  );

  return packgeJson.version ?? '0.0.1';
}
