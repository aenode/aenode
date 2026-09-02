import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isOrderByField } from './common/is-field.js';
import { propOrderBy } from './common/prop-order-by.js';

export function printOrderByDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const { pascal: modelName } = names(model.name);

  const filterdFields = model.fields.filter((field) => isOrderByField(field));

  const dtoName = `${modelName}${ClassNameSuffix.OrderByDto}`;

  const properties = filterdFields
    .map((field) => propOrderBy(field))
    .join('\n');

  return [classDecorator, `export class ${dtoName} {`, properties, `} `]
    .filter((e) => e)
    .join('\n');
}
