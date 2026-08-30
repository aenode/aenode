import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import { isRequiredField } from './is-field.js';
import { scalarBoxType } from './scalar-box-type.js';

/**
 * Print prop decorator options such as { isRequried:true }
 *
 * @param field
 * @returns
 */
export function propDecoratorOptions(field: DMMF.Field): string {
  if (field.kind !== 'scalar' && field.kind !== 'enum') {
    throw new Error('only for scalar/enum types');
  }
  const options: [propOption: keyof PropOptions, value: string][] = [];

  const push = (key: keyof PropOptions, value: string) =>
    options.push([key, value]);

  const isArray = field.isList === true;
  const isRequired = isRequiredField(field);

  if (field.kind === 'enum') push('enum', `()=>P.$Enums.${field.type}`);
  else if (field.kind === 'scalar') {
    if (isArray) {
      push('type', scalarBoxType(field));
    }
  }
  if (isRequired === true) push('isRequired', 'true');
  if (isArray === true) push('isArray', 'true');

  const preResult = options.map(([key, value]) => `${key}:${value}`).join(',');

  return `{${preResult}};`;
}
