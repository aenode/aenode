import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';

export function printArrayWhereDtoClass(model: DMMF.Model) {
  const className = `${model.name}${ClassNameSuffix.ArrayWhereDto}`;
  const whereName = `${model.name}${ClassNameSuffix.WhereDto}`;
  return [
    `export class ${className} { `,
    `  @Prop({ object: ()=>${whereName} }) every?: ${whereName}`,
    `  @Prop({ object: ()=>${whereName} }) some?: ${whereName}`,
    `  @Prop({ object: ()=>${whereName} }) none?: ${whereName}`,
    '}',
  ].join('\n');
}
