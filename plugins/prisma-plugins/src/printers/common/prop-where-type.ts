import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './dto-suffix.js';

export function propWhereType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'object': {
      if (field.isList) {
        return `${field.type}${ClassNameSuffix.ArrayWhereDto}`;
      }
      return `${field.type}${ClassNameSuffix.WhereDto}`;
    }
    case 'scalar': {
      switch (field.type) {
        case 'String': {
          if (field.isList) {
            return 'F.StringArrayFilterDto';
          }
          return 'F.StringFilterDto';
        }
        case 'DateTime': {
          if (field.isList) {
            return 'F.DateArrayFilterDto';
          }
          return 'F.DateFilterDto';
        }
        case 'Boolean':
        case 'Bool': {
          if (field.isList) {
            return 'F.BooleanArrayFilterDto';
          }
          return 'F.BooleanFilterDto';
        }
        case 'Float':
        case 'Decimal':
        case 'Int': {
          if (field.isList) {
            return 'F.IntArrayFilterDto';
          }
          return 'F.IntFilterDto';
        }
        case 'Json': {
          return 'F.JsonFilterDto';
        }
      }
      throw new Error('No sclar');
    }
    case 'enum': {
      if (field.isList) {
        return `${field.type}${ClassNameSuffix.EnumArrayFilterDto}`;
      }
      return `${field.type}${ClassNameSuffix.EnumFilterDto}`;
    }
    case 'unsupported': {
      return 'unkown';
    }
  }
}
