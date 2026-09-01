import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isWhereField } from './common/is-field.js';
import { propDecorator } from './common/prop-decorator.js';
import { propDefinition } from './common/prop-definition.js';
import { propWhereType } from './common/prop-where-type.js';

export function printWhereDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const { pascal: modelName } = names(model.name);

  const filterdFields = model.fields.filter((field) => isWhereField(field));

  const dtoName = `${modelName}${ClassNameSuffix.WhereDto}`;

  const properties = filterdFields
    .map((field) => {
      return [
        ' ',
        propDecorator(`{ object: ()=> ${propWhereType(field)} } `),
        propDefinition(field, false, propWhereType(field)),
      ].join(' ');
    })
    .join('\n');

  return [classDecorator, `export class ${dtoName} {`, properties, `} `]
    .filter((e) => e)
    .join('\n');
}
