import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Rest dto Generator',
    defaultOutput: '../src/generated/dtos',
    requiresGenerators: ['prisma-client'],
  };
}
