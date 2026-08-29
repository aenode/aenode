import type { DMMF } from '@prisma/generator-helper';
import type { ClassNameSuffix } from './dto-suffix.js';

export function printDtoClass(
  model: DMMF.Model,
  classNameSuffix: ClassNameSuffix,
  fieldFilterFn: (field: DMMF.Field) => boolean,
  importPrinerFn: (model: DMMF.Model) => string,
  classDecoratorPrinterFn: (model: DMMF.Model) => string,
  fieldDecoratorPritnerFn: (model: DMMF.Model, field: DMMF.Field) => string,
  fieldPrinterFn: (model: DMMF.Model, field: DMMF.Field) => string,
) {
  const printedFields = model.fields
    .filter((field) => fieldFilterFn(field))
    .map((field) => {
      return [
        fieldDecoratorPritnerFn(model, field),
        fieldPrinterFn(model, field),
      ].join(' ');
    })
    .join('\n');

  return [
    importPrinerFn(model),
    classDecoratorPrinterFn(model),
    `export class ${model.name}${classNameSuffix} {`,
    printedFields,
    `}`,
  ].join('\n');
}
