import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './dto-suffix.js';

export function propSingularType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'object': {
      return `${field.type}${ClassNameSuffix.ReadDto}`;
    }
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
    case 'unsupported': {
      return 'unkown';
    }
  }
}

export function propType(field: DMMF.Field): string {
  const arrayMark = field.isList ? '[]' : '';
  return `${propSingularType(field)}${arrayMark}`;
}
