import type { DMMF } from '@prisma/generator-helper';
import { ClassNameSuffix } from './common/dto-suffix.js';

export function printEnumArrayFilterDto(model: DMMF.DatamodelEnum) {
  const dtoName = `${model.name}${ClassNameSuffix.EnumArrayFilterDto}`;
  const enumName = `P.$Enums.${model.name}`;
  return [
    '@InputType()',
    `export class ${dtoName} {`,
    `  @Prop() isEmpty?: boolean`,
    `  @Prop({ enum: ()=>${enumName} }) has?: ${enumName}`,
    `  @Prop({ enum: ()=>${enumName}, isArray:true }) equals?: ${enumName}[]`,
    `  @Prop({ enum: ()=>${enumName}, isArray:true }) hasEvery?: ${enumName}[]`,
    `  @Prop({ enum: ()=>${enumName}, isArray:true }) hasSome?: ${enumName}[]`,
    `}`,
  ].join('\n');
}

export function printEnumFilterDto(model: DMMF.DatamodelEnum) {
  const dtoName = `${model.name}${ClassNameSuffix.EnumFilterDto}`;
  const enumName = `P.$Enums.${model.name}`;
  return [
    '@InputType()',
    `export class ${dtoName} {`,
    `  @Prop({ enum:()=>${enumName} }) equals?: ${enumName}`,
    `  @Prop({ enum:()=>${enumName}, isArray:true }) in?: ${enumName}[]`,
    `  @Prop({ enum:()=>${enumName}, isArray:true }) notIn?: ${enumName}[]`,
    `  @Prop({ object:()=>${dtoName} }) not?: ${dtoName}`,
    `}`,
  ].join('\n');
}

export function printEnumFilterDtos(enums: DMMF.DatamodelEnum[]) {
  const preResult = enums
    .flatMap((data) => [
      printEnumFilterDto(data),
      printEnumArrayFilterDto(data),
    ])
    .join('\n');

  return [
    `import { Prop, InputType} from '@aenode/nestjs/graphql';`,
    `import * as P from '../../prisma/client.js';`,
    preResult,
  ].join('\n');
}
