import type { DMMF } from '@prisma/generator-helper';

/**
 * Print typescript box type. This is for type option in prop decorator options.
 *
 * @param field
 * @returns
 */
export function scalarBoxType(field: DMMF.Field): string {
  if (field.kind !== 'scalar') {
    throw new Error('field must be scalar');
  }
  switch (field.type) {
    case 'Json':
    case 'String': {
      return 'String';
    }
    case 'Decimal':
    case 'Flaot': {
      return 'Number';
    }
    case 'Boolean': {
      return 'Boolean';
    }
    case 'DateTime': {
      return 'Date';
    }

    default: {
      return 'unkown';
    }
  }
}
