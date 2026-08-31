import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import { extractAnnotations } from './extract-annotations.js';
import { isRequiredField } from './is-field.js';
import { scalarBoxType } from './scalar-box-type.js';

/**
 * Print prop decorator options such as { isRequried:true }
 *
 * @param field
 * @returns
 */
export function propDecoratorOptions(field: DMMF.Field): string {
  const options: [propOption: keyof PropOptions, value: string][] = [];
  const push = (key: keyof PropOptions, value: string) =>
    options.push([key, value]);
  const isArray = field.isList === true;
  const isRequired = isRequiredField(field);

  if (field.kind === 'enum') {
    push('enum', `()=>P.$Enums.${field.type}`);
  } else if (field.kind === 'scalar') {
    if (isArray) {
      push('type', scalarBoxType(field));
    }
  } else {
    throw new Error('only for scalar/enum types');
  }

  const annotations = extractAnnotations(field.documentation ?? '');

  if (annotations) {
    for (const [key, value] of Object.entries(annotations)) {
      push(key as keyof PropOptions, value);
    }
  }

  if (isArray === true) {
    push('isArray', 'true');
  }

  if (isRequired === true) {
    if (!field.isList) {
      push('isRequired', 'true');
    }
  }

  const preResult = options
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  if (preResult.trim()) {
    return `{ ${preResult} }`;
  }
  return '';
}
