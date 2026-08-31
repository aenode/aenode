import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import { extractAnnotations } from './extract-annotations.js';
import { scalarBoxType } from './scalar-box-type.js';

/**
 * Print prop decorator options such as { isRequried:true }
 *
 * @param field
 * @returns
 */
export function propDecoratorOptions(
  field: DMMF.Field,
  isRequired: boolean,
  includeValidations = true,
): string {
  const options: [propOption: keyof PropOptions, value: string][] = [];
  const push = (key: keyof PropOptions, value: string) =>
    options.push([key, value]);
  const isArray = field.isList === true;

  SetTypes: {
    if (field.kind === 'enum') {
      push('enum', `()=>P.$Enums.${field.type}`);
    } else if (field.kind === 'scalar') {
      if (isArray) {
        push('type', `()=>${scalarBoxType(field)}`);
      }
    } else {
      throw new Error('only for scalar/enum types');
    }

    if (isArray === true) {
      push('isArray', 'true');
    }

    break SetTypes;
  }

  const annotations = extractAnnotations(field.documentation ?? '');

  if (annotations) {
    for (const [key, value] of Object.entries(annotations)) {
      push(key as keyof PropOptions, value);
    }
  }

  IncludeValiations: if (includeValidations) {
    if (isRequired === true) {
      if (!field.isList) {
        push('isRequired', 'true');
      }
    }

    break IncludeValiations;
  }

  const preResult = options
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  if (preResult.trim()) {
    return `{ ${preResult} }`;
  }

  return '';
}
