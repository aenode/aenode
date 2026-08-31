import { writeTextFile } from '@aenode/fs';
import { names } from '@aenode/names';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { join } from 'node:path';
import { printCreateDtoClass } from '../printers/print-create-dto-class.js';
import { printReadDtoClass } from '../printers/print-read-dto-class.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  for (const model of options.dmmf.datamodel.models) {
    ReadDtoPrinter: {
      const { kebab } = names(model.name);
      const fileName = `${kebab}-read.dto.ts`;
      const filepath = join(output, kebab, fileName);
      const code = printReadDtoClass(model);

      await writeTextFile(filepath, code);
      break ReadDtoPrinter;
    }

    CreateDtoPrinter: {
      const { kebab } = names(model.name);
      const fileName = `${kebab}-create.dto.ts`;
      const filepath = join(output, kebab, fileName);
      const code = printCreateDtoClass(model);

      await writeTextFile(filepath, code);
      break CreateDtoPrinter;
    }
  }
}
