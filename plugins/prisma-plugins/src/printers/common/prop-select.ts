import type { DMMF } from '@prisma/generator-helper';
import { propDecorator } from './prop-decorator.js';
import { propDefinition } from './prop-definition.js';
import { propSelectDecoratorOptions } from './prop-select-decorator-options.js';
import { propSelectType } from './prop-select-type.js';

export function propSelect(field: DMMF.Field) {
  return [
    ' ',
    propDecorator(propSelectDecoratorOptions(field)),
    propDefinition(field, false, propSelectType(field)),
  ].join(' ');
}
