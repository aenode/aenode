import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './dto-suffix.js';

export function propOrderByType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'object': {
      if (field.isList) {
        return `F.SortCountDto`;
      }
      return `${field.type}${ClassNameSuffix.OrderByDto}`;
    }
    case 'scalar':
    case 'enum': {
      return `F.SortOrder`;
    }
    case 'unsupported': {
      return 'unkown';
    }
  }
}
