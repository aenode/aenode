import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isReadDtoField } from './common/is-field.js';
import { propDecoratorOptions } from './common/prop-decorator-options.js';
import { propDecorator } from './common/prop-decorator.js';
import { propDefinition } from './common/prop-definition.js';
import { propType } from './common/prop-type.js';

export function printReadDtoClass(model: DMMF.Model) {
  const { pascal: modelName } = names(model.name);

  const filteredFields = model.fields.filter((field) => isReadDtoField(field));

  const properties = filteredFields
    .map((field) => {
      return [
        ' ',
        propDecorator(propDecoratorOptions(field, false, false)),
        propDefinition(field, false, propType(field)),
      ].join(' ');
    })
    .join('\n');

  const dtoName = `${modelName}${ClassNameSuffix.ReadDto}`;

  const classDecorator = '@ObjectType()';

  return [classDecorator, `export class ${dtoName} {`, properties, '}']
    .filter((e) => e)
    .join('\n');
}
