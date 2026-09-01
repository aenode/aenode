import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Graphql Dto Generator',
    defaultOutput: '../src/generated/dtos',
    requiresGenerators: ['prisma-client'],
  };
}
