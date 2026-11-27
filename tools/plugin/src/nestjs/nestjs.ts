import { type Tree } from '@nx/devkit';
import type { NestjsGeneratorSchema } from './schema.js';

export async function nestjsGenerator(
  _tree: Tree,
  options: NestjsGeneratorSchema,
) {
  console.log(options);
}

export default nestjsGenerator;
