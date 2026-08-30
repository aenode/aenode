import type { DMMF } from '@prisma/generator-helper';

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
  }

  throw new Error('Cannot match the field.type for any scalar type');
}
