import type { DMMF } from '@prisma/generator-helper';
import { FieldMetadata } from '../../helpers/field-metadata.js';
import { toWritableOptions } from '../../helpers/to-writable-options.js';

export function __printProperty(
  name: string,
  isRequired: boolean,
  options: string,
  type: string,
): string {
  return `@Prop(${options}) ${name}${isRequired ? '' : '?'}: ${type}`;
}

export function printProjectionProperty(field: DMMF.Field): string {
  return __printProperty(field.name, false, '', 'boolean');
}

export function printProperty(field: DMMF.Field, isRequired?: boolean) {
  const meta = new FieldMetadata(field);

  isRequired ??= meta.required === true;

  return __printProperty(
    field.name,
    isRequired,
    toWritableOptions(meta),
    meta.tsType,
  );
}
