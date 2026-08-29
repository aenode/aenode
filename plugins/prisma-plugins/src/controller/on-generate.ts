import type { GeneratorOptions } from '@prisma/generator-helper';

export default async function onGenerate(options: GeneratorOptions) {
  console.log(options.dmmf.datamodel.models.map((e) => e.name));
}
