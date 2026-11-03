import type { GeneratorManifest } from '@prisma/generator-helper';

export default function onManifest(): GeneratorManifest {
  return {
    prettyName: 'Nest dto and base service generator',
    defaultOutput: '../src/generated/nest',
    requiresGenerators: ['prisma-client'],
  };
}
