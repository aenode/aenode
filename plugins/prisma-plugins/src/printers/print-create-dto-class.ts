import { names } from '@aenode/names';
import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isCreateDtoField, isRequiredField } from './common/is-field.js';
import { propDecoratorOptions } from './common/prop-decorator-options.js';
import { propDecorator } from './common/prop-decorator.js';
import { propDefinition } from './common/prop-definition.js';
import { propType } from './common/prop-type.js';

export function printCreateDtoClass(model: DMMF.Model) {
  const { pascal: modelName } = names(model.name);

  const filteredFields = model.fields.filter((field) =>
    isCreateDtoField(field),
  );

  const properties = filteredFields
    .map((field) => {
      return [
        ' ',
        propDecorator(propDecoratorOptions(field, isRequiredField(field))),
        propDefinition(field, isRequiredField(field), propType(field)),
      ].join(' ');
    })
    .join('\n');

  const createDtoName = `${modelName}${ClassNameSuffix.CreateDto}`;

  const classDecorator = ['', '@InputType()'].join('\n');

  return [
    classDecorator,
    `export class ${createDtoName} {`,
    properties,
    '}',

    classDecorator,
    `export class ${modelName}${ClassNameSuffix.UpdateDto} extends PartialType(${createDtoName}) { } `,
  ]
    .filter((e) => e)
    .join('\n');
}
