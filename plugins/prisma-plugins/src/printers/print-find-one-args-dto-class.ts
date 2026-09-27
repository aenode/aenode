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

  const hasSelect = model.fields.some((e) => isSelectField(e));
  const hasInclude = model.fields.some((e) => isIncludeField(e));
  const hasOmit = model.fields.some((e) => isOmitField(e));

  return [
    hasSelect &&
      `  @Prop({ object: () => ${SelectDto} }) select?: ${SelectDto};`,
    hasInclude &&
      `  @Prop({ object: () => ${IncludeDto} }) include?: ${IncludeDto};`,
    hasOmit && `  @Prop({ object: () => ${OmitDto} }) omit?: ${OmitDto};`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function printFindOneArgsDtoClass(
  model: DMMF.Model,
  classDecorator = '@InputType()',
) {
  const className = `${model.name}${ClassNameSuffix.FindOneArgsDto}`;

  const properties = printFindOneArgsDtoProperties(model);

  if (properties) {
    return [classDecorator, `export class ${className}{`, properties, `}`].join(
      '\n',
    );
  }

  return '';
}
