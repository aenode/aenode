import type { DMMF } from '@prisma/generator-helper';

function __propType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'scalar': {
      switch (field.type) {
        case 'String': {
          return `string`;
        }
        case 'Decimal':
        case 'Int': {
          return `number`;
        }
        case 'Bool':
        case 'Boolean': {
          return 'boolean';
        }
        case 'DateTime': {
          return `Date`;
        }
        case 'Json': {
          return 'string';
        }
      }
      throw new Error(`Unkown scalar type: ${field.type}`);
    }
    case 'enum': {
      return `P.$Enums.${field.type}`;
    }
    case 'unsupported':
    case 'object': {
      throw new Error('this method is only for scalar/enum types');
    }
  }
}

export function propType(field: DMMF.Field): string {
  const arrayMark = field.isList ? '[]' : '';
  return `${__propType(field)}${arrayMark}`;
}
