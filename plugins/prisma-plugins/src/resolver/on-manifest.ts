import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Graphql resolver generator',
    defaultOutput: '../src/generated/resources',
    requiresGenerators: ['prisma-client'],
  };
}
