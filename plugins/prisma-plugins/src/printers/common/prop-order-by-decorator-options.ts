import type { DMMF } from '@prisma/generator-helper';
import { propOrderByType } from './prop-order-by-type.js';

export function propOrderByDecoratorOptions(field: DMMF.Field) {
  switch (field.kind) {
    case 'object': {
      if (field.isList) {
        return `{ object: ()=> ${propOrderByType(field)} }`;
      }
      return `{ object: ()=> ${propOrderByType(field)} }`;
    }
    case 'scalar':
    case 'enum': {
      return `{ enum: ()=> ${propOrderByType(field)} }`;
    }

    case 'unsupported': {
      return 'unkown';
    }
  }
}
