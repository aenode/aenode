import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';

export function printFindOneArgsDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.FindOneArgsDto}`;
  const SelectDto = `${model.name}${ClassNameSuffix.SelectDto}`;
  const IncludeDto = `${model.name}${ClassNameSuffix.IncludeDto}`;
  const OmitDto = `${model.name}${ClassNameSuffix.OmitDto}`;

  return [
    classDecorator,
    `export class ${className}{`,
    `  @Prop({ object: ()=> ${SelectDto} }) select?: ${SelectDto};`,
    `  @Prop({ object: ()=> ${IncludeDto} }) include?: ${IncludeDto};`,
    `  @Prop({ object: ()=> ${OmitDto} }) omit?: ${OmitDto};`,
    `}`,
  ].join('\n');
}
