import type { DMMF } from '@prisma/generator-helper';
import { FieldMetadata } from '../../helpers/field-metadata.js';
import { printProperty } from './print-property.js';

export function printDtoClasses(model: DMMF.Model) {
  const filteredFields = model.fields.filter(
    (field) => new FieldMetadata(field).isDtoField,
  );

  const dtoFields = filteredFields
    .map((field) => printProperty(field))
    .map((e) => `  ${e}`)
    .join('\n');

  const readDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isReadField)
    .map((field) => printProperty(field))
    .map((e) => `  ${e}`)
    .join('\n');

  const creatDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isInputField)
    .map((field) => printProperty(field))
    .map((e) => `  ${e}`)
    .join('\n');

  const updateDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isUpdateField)
    .map((field) => printProperty(field, true))
    .map((e) => `  ${e}`)
    .join('\n');

  const imports: string[] = [];

  if (model.fields.some((e) => e.kind === 'enum')) {
    imports.push(`import * as P from '../../prisma/client.js';`);
  }

  return [
    `import { Prop } from '@aenode/nest';`,
    imports,
    '',
    '',
    `export class ${model.name}Dto {`,
    dtoFields,
    `}`,
    '',
    `export class ${model.name}ReadDto {`,
    readDtoFields,
    `}`,
    '',
    `export class ${model.name}CreateDto {`,
    creatDtoFields,
    `}`,
    '',
    `export class ${model.name}UpdateDto {`,
    updateDtoFields,
    `}`,
    '',
  ].join('\n');
}
