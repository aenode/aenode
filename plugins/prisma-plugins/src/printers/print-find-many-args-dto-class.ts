import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import { printFindOneArgsDtoProperties } from './print-find-one-args-dto-class.js';

export function printFindManyArgsDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.FindManyArgsDto}`;
  const WhereDto = `${model.name}${ClassNameSuffix.WhereDto}`;
  const Distinct = `P.Prisma.${model.name}ScalarFieldEnum`;

  return [
    classDecorator,
    `export class ${className} {`,
    `  @Prop({ type:()=>Number,  min:0 }) take?:number;`,
    `  @Prop({ type:()=>Number,  min:0 }) skip?:number;`,
    `  @Prop({ enum: ()=>${Distinct} , isArray: true }) distinct?: ${Distinct}[];`,
    `  @Prop({ object: ()=> ${WhereDto} }) where?:${WhereDto};`,
    printFindOneArgsDtoProperties(model),
    `}`,
  ].join('\n');
}
