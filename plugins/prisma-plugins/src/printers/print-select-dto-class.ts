import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isSelectField } from './common/is-field.js';
import { propSelect } from './common/prop-select.js';

export function printSelectDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.SelectDto}`;

  const filteredFields = model.fields.filter((field) => isSelectField(field));
  const properties = filteredFields
    .map((field) => propSelect(field))
    .join('\n');

  return [classDecorator, `export class ${className} {`, properties, `}`]
    .filter((e) => e)
    .join('\n');
}
