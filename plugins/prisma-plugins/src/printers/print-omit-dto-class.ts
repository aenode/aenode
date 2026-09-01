import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isOmitField } from './common/is-field.js';
import { propSelect } from './common/prop-select.js';

export function printOmitDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.OmitDto}`;
  const filteredFields = model.fields.filter((field) => isOmitField(field));

  const properties = filteredFields
    .map((field) => propSelect(field))
    .join('\n');

  return [classDecorator, `export class ${className} {`, properties, `}`]
    .filter((e) => e)
    .join('\n');
}
