import type { DMMF } from '@prisma/generator-helper';

export function printPropDef(
  field: DMMF.Field,
  isRequired: boolean,
  propType: string,
): string {
  return `${field.name}${isRequired ? '' : '?'}: ${propType};`;
}
