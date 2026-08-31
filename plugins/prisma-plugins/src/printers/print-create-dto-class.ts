import type { DMMF } from '@prisma/generator-helper';
import { isCreateDtoField, isRequiredField } from './common/is-field.js';

import { names } from '@aenode/names';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { propDecoratorOptions } from './common/prop-decorator-options.js';
import { propDecorator } from './common/prop-decorator.js';
import { propDefinition } from './common/prop-definition.js';
import { propType } from './common/prop-type.js';

export function printCreateDtoClass(
  model: DMMF.Model,
  classImports = '',
  classDecorator = '',
) {
  const { pascal: modelName } = names(model.name);

  const createDtoFields = model.fields.filter((field) =>
    isCreateDtoField(field),
  );

  const properties = createDtoFields
    .map((field) => {
      return [
        ' ',
        propDecorator(propDecoratorOptions(field)),
        propDefinition(field, isRequiredField(field), propType(field)),
      ].join(' ');
    })
    .join('\n');

  return [
    classImports,
    classDecorator,
    `export class ${modelName}${ClassNameSuffix.CreateDto} {`,
    properties,
    '}',
  ]
    .filter((e) => e)
    .join('\n');
}
