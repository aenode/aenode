import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './dto-suffix.js';

export function propSelectType(field: DMMF.Field): string {
  switch (field.kind) {
    case 'object': {
      if (field.isList) {
        return `${field.type}${ClassNameSuffix.FindManyArgsDto}`;
      }
      return `${field.type}${ClassNameSuffix.FindOneArgsDto}`;
    }
    case 'scalar':
    case 'enum':
    case 'unsupported': {
      return 'boolean';
    }
  }
  return ``;
}
