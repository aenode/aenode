import type { DMMF } from '@prisma/generator-helper';
import { propDecorator } from './prop-decorator.js';
import { propDefinition } from './prop-definition.js';
import { propWhereDecoratorOptions } from './prop-where-decorator-options.js';
import { propWhereType } from './prop-where-type.js';

export function propWhere(field: DMMF.Field) {
  return [
    ' ',
    propDecorator(propWhereDecoratorOptions(field)),
    propDefinition(field, false, propWhereType(field)),
  ].join(' ');
}
