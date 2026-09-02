import type { DMMF } from '@prisma/generator-helper';
import { propSelectType } from './prop-select-type.js';

export function propSelectDecoratorOptions(field: DMMF.Field) {
  switch (field.kind) {
    case 'object': {
      return `{ object: ()=>${propSelectType(field)}}`;
    }
    case 'scalar':
    case 'enum':
    case 'unsupported': {
      return '{ type: ()=>Boolean }';
    }
  }
}
