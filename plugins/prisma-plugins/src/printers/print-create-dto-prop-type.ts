import type { DMMF } from '@prisma/generator-helper';

function __printCreateDtoPropType(field: DMMF.Field): string {
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
      console.warn(
        'printCreateDtoType is not able to print object/unsupported field',
      );
      return 'unkown';
    }
  }
}

export function printCreateDtoPropType(field: DMMF.Field): string {
  const arrayMark = field.isList ? '[]' : '';
  return `${__printCreateDtoPropType(field)}${arrayMark}`;
}
