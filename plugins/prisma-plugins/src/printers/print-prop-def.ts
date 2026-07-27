import type { DMMF } from '@prisma/generator-helper';

export function printPropDef(
  field: DMMF.Field,
  isRequiredField: (field: DMMF.Field) => boolean,
  printPropType: (field: DMMF.Field) => string,
): string {
  return `${field.name}${isRequiredField(field) ? '' : '?'}: ${printPropType(field)}`;
}
