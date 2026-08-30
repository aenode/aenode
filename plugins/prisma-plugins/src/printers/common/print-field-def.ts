import type { DMMF } from '@prisma/generator-helper';

export function printFieldDef(
  field: DMMF.Field,
  isRequiredField: (field: DMMF.Field) => boolean,
  printFieldType: (field: DMMF.Field) => string,
): string {
  return `${field.name}${isRequiredField(field) ? '' : '?'}: ${printFieldType(field)}`;
}
