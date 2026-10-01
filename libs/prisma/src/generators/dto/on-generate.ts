import { names } from '@aenode/names';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { printDtoClasses } from './printers/print-dto-classes.js';
import { printEnumDtos } from './printers/print-enum-dtos.js';
import { printService } from './printers/print-service.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const models = options.dmmf.datamodel.models;

  common: {
    await mkdir(join(output, 'common'), { recursive: true });
    const content = [`export * from '../../prisma/client.js';`].join('\n');
    await writeFile(join(output, 'common', 'prisma.ts'), content);

    break common;
  }

  enumDtos: {
    const content = printEnumDtos(options.dmmf.datamodel);
    const fileName = 'enums.ts';
    const filePath = join(output, 'common', fileName);

    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content);

    break enumDtos;
  }

  baral: {
    const content = [
      `export  * from './prisma.js';`,
      `export  * from './enums.js';`,
      `export *  from '@aenode/nest/dtos'`,
    ].join('\n');

    const filePath = join(output, 'common', 'index.ts');
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content);

    break baral;
  }

  for (const model of models) {
    const dtoClasses = printDtoClasses(model);
    const serviceClass = printService(model);
    const content = [dtoClasses, serviceClass].join('\n\n');

    const { kebab } = names(model.name);
    const fileName = `${kebab}.ts`;

    const filePath = join(output, kebab, fileName);

    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content);
  }
}
