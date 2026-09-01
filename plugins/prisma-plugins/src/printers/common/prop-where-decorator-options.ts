import type { DMMF } from '@prisma/generator-helper';
import { propWhereType } from './prop-where-type.js';

export function propWhereDecoratorOptions(field: DMMF.Field) {
  return `{ object: ()=>${propWhereType(field)}}`;
}
