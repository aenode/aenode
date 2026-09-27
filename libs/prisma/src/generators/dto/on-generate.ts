import { names } from '@aenode/names';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { printDtoClasses } from './printers/print-dto-classes.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const models = options.dmmf.datamodel.models;

  for (const m of models) {
    const content = printDtoClasses(m);
    const { kebab } = names(m.name);
    const fileName = `${kebab}.dto.ts`;

    const filePath = join(output, kebab, fileName);

    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, content);
  }
}
