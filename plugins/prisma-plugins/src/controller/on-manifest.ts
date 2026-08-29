import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Nestjs controller generator',
    defaultOutput: '../src/generated/resources',
    requiresGenerators: ['prisma-client'],
  };
}
