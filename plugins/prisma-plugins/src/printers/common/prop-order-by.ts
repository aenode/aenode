import type { DMMF } from '@prisma/generator-helper';
import { propDecorator } from './prop-decorator.js';
import { propDefinition } from './prop-definition.js';
import { propOrderByDecoratorOptions } from './prop-order-by-decorator-options.js';
import { propOrderByType } from './prop-order-by-type.js';

export function propOrderBy(field: DMMF.Field) {
  return [
    ' ',
    propDecorator(propOrderByDecoratorOptions(field)),
    propDefinition(field, false, propOrderByType(field)),
  ].join(' ');
}
