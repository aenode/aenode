import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';
import {
  isIncludeField,
  isOmitField,
  isSelectField,
} from './common/is-field.js';

export function printFindOneArgsDtoProperties(model: DMMF.Model) {
  const SelectDto = `${model.name}${ClassNameSuffix.SelectDto}`;
  const IncludeDto = `${model.name}${ClassNameSuffix.IncludeDto}`;
  const OmitDto = `${model.name}${ClassNameSuffix.OmitDto}`;

  const hasSelect = model.fields.filter((e) => isSelectField(e)).length > 0;
  const hasInclude = model.fields.filter((e) => isIncludeField(e)).length > 0;
  const hasOmit = model.fields.filter((e) => isOmitField(e)).length > 0;

  return [
    hasSelect
      ? `  @Prop({ object: ()=> ${SelectDto} }) select?: ${SelectDto};`
      : '',
    hasInclude
      ? `  @Prop({ object: ()=> ${IncludeDto} }) include?: ${IncludeDto};`
      : '',
    hasOmit ? `  @Prop({ object: ()=> ${OmitDto} }) omit?: ${OmitDto};` : '',
  ].join('\n');
}

export function printFindOneArgsDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.FindOneArgsDto}`;

  const properties = printFindOneArgsDtoProperties(model);

  if (properties) {
    return [classDecorator, `export class ${className}{`, `}`].join('\n');
  }

  return '';
}
