import type { GeneratorOptions } from '@prisma/generator-helper';
import { FieldMetadata } from '../helpers/field-metadata.js';
import { toWritableOptions } from '../helpers/to-writable-options.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const models = options.dmmf.datamodel.models;
  const enumModels = options.dmmf.datamodel.enums;

  console.log('Output:  ', output);

  console.log(
    'Models: ',
    models.map((e) => e.name),
  );

  console.log(
    'Enums: ',
    enumModels.map((e) => e.name),
  );

  for (const m of models) {
    console.log(
      `${m.name} input field:`,
      m.fields
        .map((f) => new FieldMetadata(f))
        .map((meta) => {
          return toWritableOptions(meta);
        }),
    );
  }
}
