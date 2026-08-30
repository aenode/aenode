import type { DMMF } from '@prisma/generator-helper';
import type { ClassNameSuffix } from './dto-suffix.js';

export function dtoClass(
  model: DMMF.Model,
  classNameSuffix: ClassNameSuffix,
  properties: string,
) {
  return [
    `export class ${model.name}${classNameSuffix} {`,
    properties,
    `}`,
  ].join('\n');
}
