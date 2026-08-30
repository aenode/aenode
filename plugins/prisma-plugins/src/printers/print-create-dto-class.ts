import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import { isRequiredField } from './common/is-field.js';

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
  return `${model.name}`;
}
