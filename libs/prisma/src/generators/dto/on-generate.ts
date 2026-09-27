import type { GeneratorOptions } from '@prisma/generator-helper';
import { isInputField, isUpdateField } from '../helpers/metadata.js';

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
      m.fields.filter((e) => isInputField(e)).map((e) => e.name),
    );

    console.log(
      `${m.name} update field:  `,
      m.fields.filter((e) => isUpdateField(e)).map((e) => e.name),
    );
  }
}
