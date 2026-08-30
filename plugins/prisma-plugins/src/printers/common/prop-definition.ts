import type { DMMF } from '@prisma/generator-helper';

/**
 * Print class property definition such as "name: string;"
 *
 * @param field model field
 * @param isRequired is required field
 * @param propType property type
 * @returns
 */
export function propDefinition(
  field: DMMF.Field,
  isRequired: boolean,
  propType: string,
): string {
  return `${field.name}${isRequired ? '' : '?'}: ${propType};`;
}
