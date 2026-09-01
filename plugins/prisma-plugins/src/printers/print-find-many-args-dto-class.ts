import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';

export function printFindManyArgsDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.FindManyArgsDto}`;
  const WhereDto = `${model.name}${ClassNameSuffix.WhereDto}`;
  const SelectDto = `${model.name}${ClassNameSuffix.SelectDto}`;
  const IncludeDto = `${model.name}${ClassNameSuffix.IncludeDto}`;
  const OmitDto = `${model.name}${ClassNameSuffix.OmitDto}`;

  const Distinct = `P.Prisma.${model.name}ScalarFieldEnum`;
  return [
    classDecorator,
    `export class ${className} {`,
    `  @Prop({ min:0 }) take?:number;`,
    `  @Prop({ min:0 }) skip?:number;`,
    `  @Prop({ enum: ()=>${Distinct} , isArray: true }) distinct?: ${Distinct}[];`,
    `  @Prop({ object: ()=> ${WhereDto} }) where?:${WhereDto};`,
    `  @Prop({ object: ()=> ${SelectDto} }) select?:${SelectDto};`,
    `  @Prop({ object: ()=> ${IncludeDto} }) include?:${IncludeDto};`,
    `  @Prop({ object: ()=> ${OmitDto} }) omit?:${OmitDto};`,
    `}`,
  ].join('\n');
}
