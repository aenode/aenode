import type { PropOptions } from '@aenode/prop-options';
import type { DMMF } from '@prisma/generator-helper';
import {
  extractAnnotations,
  pickValidationAnnotaitons,
} from './extract-annotations.js';
import { propSingularType } from './prop-type.js';
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
      push('enum', `()=>${propSingularType(field)}`);
    } else if (field.kind === 'scalar') {
      if (isArray) {
        push('type', `()=>${scalarBoxType(field)}`);
      }
    } else if (field.kind === 'object') {
      push('object', `()=>${propSingularType(field)}`);
    }

    if (isArray === true) {
      push('isArray', 'true');
    }

    break SetTypes;
  }

  const annotations = extractAnnotations(field.documentation ?? '');

  if (annotations) {
    for (const [key, value] of Object.entries(
      pickValidationAnnotaitons(annotations),
    )) {
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
