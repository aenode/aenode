import pkg from '@prisma/generator-helper';
import onGenerate from './on-generate.js';
import onManifest from './on-manifest.js';

export default pkg.generatorHandler({
  onManifest: onManifest,
  onGenerate: onGenerate,
});
