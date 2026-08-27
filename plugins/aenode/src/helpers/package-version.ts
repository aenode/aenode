import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

export function packageVersion(packageName: string) {
  const require = createRequire(`${workspaceRoot}/package.json`);
  const packageJsonPath = require.resolve(`${packageName}/package.json`);
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
}
