import type { DMMF } from '@prisma/generator-helper';
import type { ClassNameSuffix } from './dto-suffix.js';

export function printDtoClass(
  model: DMMF.Model,
  classNameSuffix: ClassNameSuffix,
  importPrinterFn: (model: DMMF.Model) => string,
  classDecoratorPrinterFn: (model: DMMF.Model) => string,
) {
  const printedFields = '';

  return [
    importPrinterFn(model),
    classDecoratorPrinterFn(model),
    `export class ${model.name}${classNameSuffix} {`,
    printedFields,
    `}`,
  ].join('\n');
}
