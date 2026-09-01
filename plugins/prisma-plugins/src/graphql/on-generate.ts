import { writeTextFile } from '@aenode/fs';
import type { GeneratorOptions } from '@prisma/generator-helper';
import { join } from 'node:path';
import { printCreateDtoClass } from '../printers/print-create-dto-class.js';
import { printEnumFilterDtos } from '../printers/print-enum-filter-dto-class.js';
import { printReadDtoClass } from '../printers/print-read-dto-class.js';
import { printWhereDtoClass } from '../printers/print-where-dto-class.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const commonContent: string[] = [];
  const readDtoContent: string[] = [];
  const createDtoContent: string[] = [];
  const whereDtoContent: string[] = [];

  const contents = [
    commonContent,
    readDtoContent,
    createDtoContent,
    whereDtoContent,
  ];

  const enumModels = options.dmmf.datamodel.enums;

  AddImports: {
    commonContent.push(
      `import '@aenode/nestjs';`,
      `import { Prop, InputType, ObjectType, PartialType }  from '@aenode/nestjs/graphql'`,
      `import *  as F  from '@aenode/nestjs/graphql'`,
      enumModels.length > 0
        ? `import *  as P  from '../../prisma/client.js'`
        : '',
    );

    break AddImports;
  }

  EnumFilters: if (enumModels) {
    const code = printEnumFilterDtos([...enumModels]);

    readDtoContent.push(code);

    break EnumFilters;
  }

  for (const model of options.dmmf.datamodel.models) {
    ReadDtoPrinter: {
      const code = printReadDtoClass(model);
      readDtoContent.push(code);
      break ReadDtoPrinter;
    }

    CreateDtoPrinter: {
      const code = printCreateDtoClass(model);

      createDtoContent.push(code);
      break CreateDtoPrinter;
    }

    WhereDtoPritner: {
      const code = printWhereDtoClass(model);

      whereDtoContent.push(code);
      break WhereDtoPritner;
    }

    const content = contents.flatMap((e) => e).join('\n');

    await writeTextFile(join(output, 'index.ts'), content);
  }
}
