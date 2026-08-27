import { workspaceRoot } from '@nx/devkit';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(`${workspaceRoot}/package.json`);

const packageJsonPath = require.resolve('@aenode/aenode/package.json');

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

console.log('version', packageJson.version);
