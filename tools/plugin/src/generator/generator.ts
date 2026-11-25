import { type Tree } from '@nx/devkit';
import type { GeneratorGeneratorSchema } from './schema.js';

export async function generatorGenerator(tree: Tree, options: GeneratorGeneratorSchema) {
  console.log('Geneate generator:  ', tree.root, options);
}

export default generatorGenerator;
