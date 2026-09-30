import type { DMMF } from '@prisma/generator-helper';
import { FieldMetadata } from '../../helpers/field-metadata.js';
import {
  printProjectionProperty,
  printProperty,
  printWhereProperty,
} from './print-property.js';

export function printDtoClasses(model: DMMF.Model) {
  const filteredFields = model.fields
    .filter((field) => new FieldMetadata(field).isDtoField)
    .sort((field) => (new FieldMetadata(field).required === true ? -1 : 1));

  const readDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isReadField)

    .map((field) => printProperty(field, false))
    .map((e) => `  ${e}`)
    .join('\n');

  const creatDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isInputField)
    .map((field) => printProperty(field))
    .map((e) => `  ${e}`)
    .join('\n');

  const updateDtoFields = filteredFields
    .filter((field) => new FieldMetadata(field).isUpdateField)
    .map((field) => printProperty(field, false))
    .map((e) => `  ${e}`)
    .join('\n');

  const projectionDtoField = filteredFields
    .filter((field) => new FieldMetadata(field).isReadField)
    .map((field) => printProjectionProperty(field))
    .map((e) => `  ${e}`)
    .join('\n');

  const whereDtoField = filteredFields
    .map((field) => {
      return printWhereProperty(field);
    })
    .map((e) => `  ${e}`)
    .join('\n');

  const imports: string[] = [];

  return [
    `import { Prop } from '@aenode/nest';`,
    `import * as P from '../common/index.js';`,
    imports,
    '',
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
    ``,
    `export class ${model.name}ProjectionDto { `,
    projectionDtoField,
    `}`,
    ``,
    `export class ${model.name}WhereDto {`,
    whereDtoField,
    `}`,
    ``,
    `export class ${model.name}FindManyDto {`,
    `  @Prop({ min: 1, default: 20 }) take?: number;`,
    `  @Prop({ min: 0, default: 0 }) skip?: number;`,
    `  @Prop({ type: () => ${model.name}ProjectionDto, minProperties: 1, notWith: ['omit'] })`,
    `  select?: ${model.name}ProjectionDto;`,
    `  @Prop({ type: () => ${model.name}ProjectionDto, minProperties: 1, notWith: ['select'] })`,
    `  omit?: ${model.name}ProjectionDto;`,
    `  @Prop({ type: ()=> ${model.name}WhereDto })`,
    `  where?: ${model.name}WhereDto`,
    `}`,

    '',
  ].join('\n');
}
