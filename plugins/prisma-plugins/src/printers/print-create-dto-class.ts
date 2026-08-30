import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { isCreateDtoField, isRequiredField } from './common/is-field.js';
import { printCreateDtoPropType } from './common/print-create-dto-prop-type.js';
import { printPropDecorator } from './common/print-prop-decorator.js';
import { printPropDef } from './common/print-prop-def.js';

export function __printCreateDtoPropertyOptions(
  field: DMMF.Field,
): PropOptions {
  const options: PropOptions = {};
  const isRequired = isRequiredField(field);
  if (isRequired === true) options.isRequired = true;

  return options;
}
export function printCreateDtoPropDecoratorOptions(field: DMMF.Field) {
  return JSON.stringify(__printCreateDtoPropertyOptions(field));
}

export function printCreateDtoClass(model: DMMF.Model) {
  const properties = model.fields
    .filter((field) => isCreateDtoField(field))
    .map((field) => {
      const isRequired = isRequiredField(field);
      const type = printCreateDtoPropType(field);
      const propDefinition = printPropDef(field, isRequired, type);

      const decoratorOptions = printCreateDtoPropDecoratorOptions(field);
      const propDecorator = printPropDecorator(decoratorOptions);

      return ['  ', propDecorator, propDefinition].join(' ');
    })
    .join('\n');

  return [
    `export class ${model.name}${ClassNameSuffix.CreateDto} {`,

    properties,

    '}',
  ].join('\n');
}
