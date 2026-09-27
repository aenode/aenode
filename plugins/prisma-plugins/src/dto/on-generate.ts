import { writeTextFile } from '@aenode/fs';
import type { DMMF, GeneratorOptions } from '@prisma/generator-helper';
import { join } from 'node:path';
import { printArrayWhereDtoClass } from '../printers/print-array-where-dto-class.js';
import { printCreateDtoClass } from '../printers/print-create-dto-class.js';
import { printEnumFilterDtos } from '../printers/print-enum-filter-dto-class.js';
import { printFindManyArgsDtoClass } from '../printers/print-find-many-args-dto-class.js';
import { printFindOneArgsDtoClass } from '../printers/print-find-one-args-dto-class.js';
import { printIncludeDtoClass } from '../printers/print-include-dto-class.js';
import { printOmitDtoClass } from '../printers/print-omit-dto-class.js';
import { printOrderByDtoClass } from '../printers/print-order-by-dto-class.js';
import { printReadDtoClass } from '../printers/print-read-dto-class.js';
import { printRegisterEnums } from '../printers/print-register-enums.js';
import { printSelectDtoClass } from '../printers/print-select-dto-class.js';
import { printWhereDtoClass } from '../printers/print-where-dto-class.js';

export default async function onGenerate(options: GeneratorOptions) {
  const output = options.generator.output?.value;

  if (!output) throw new Error('output is required!');

  const commonContent: string[] = [];
  const readDtoContent: string[] = [];
  const projectionDtos: string[] = [];
  const createDtoContent: string[] = [];
  const whereDtoContent: string[] = [];

  const contents = [
    commonContent,
    readDtoContent,
    createDtoContent,
    projectionDtos,
    whereDtoContent,
  ];

  const enumModels = options.dmmf.datamodel.enums;

  AddImports: {
    commonContent.push(
      `import '@aenode/nestjs';`,
      `import { Prop, InputType, ObjectType, PartialType }  from '@aenode/nestjs'`,
      `import *  as F  from '@aenode/nestjs/graphql'`,
      `import *  as P  from '../prisma/client.js'`,

      printRegisterEnums(options.dmmf.datamodel.models as DMMF.Model[]),
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

    SelectDto: {
      const code = printSelectDtoClass(model);
      projectionDtos.push(code);
      break SelectDto;
    }

    OmitDto: {
      const code = printOmitDtoClass(model);
      projectionDtos.push(code);
      break OmitDto;
    }

    IncludeDto: {
      const code = printIncludeDtoClass(model);
      projectionDtos.push(code);
      break IncludeDto;
    }

    OrderByDto: {
      const code = printOrderByDtoClass(model);
      projectionDtos.push(code);
      break OrderByDto;
    }

    WhereDtoPritner: {
      const code = printWhereDtoClass(model);
      whereDtoContent.push(code);
      break WhereDtoPritner;
    }

    ArrayWhereDtoPrinter: {
      const code = printArrayWhereDtoClass(model);
      whereDtoContent.push(code);
      break ArrayWhereDtoPrinter;
    }

    PrintFindManyArgsDtoClass: {
      const code = printFindManyArgsDtoClass(model);
      whereDtoContent.push(code);
      break PrintFindManyArgsDtoClass;
    }

    PrintFindOneArgsDtoClass: {
      const code = printFindOneArgsDtoClass(model);
      whereDtoContent.push(code);
      break PrintFindOneArgsDtoClass;
    }

    const content = contents.flatMap((e) => e).join('\n\n');

    await writeTextFile(join(output, 'index.ts'), content);
  }
}
