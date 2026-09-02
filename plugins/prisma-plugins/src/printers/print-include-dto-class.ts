import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isIncludeField } from './common/is-field.js';
import { propSelect } from './common/prop-select.js';

export function printIncludeDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.IncludeDto}`;
  const filteredFields = model.fields.filter((field) => isIncludeField(field));

  if (filteredFields.length === 0) {
    return '';
  }

  const properties = filteredFields
    .map((field) => propSelect(field))
    .join('\n');

  return [
    classDecorator,
    `export class ${className} {`,
    `@Prop({ type: ()=>Boolean }) _count?: boolean;`,
    properties,
    `}`,
  ]
    .filter((e) => e)
    .join('\n');
}
