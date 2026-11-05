import type { DMMF } from '@prisma/generator-helper';

export function printEnumFilterDto(model: DMMF.DatamodelEnum) {
  const dtoName = `Enum${model.name}FilterDto`;
  const modelName = model.name;

  return [
    `export class ${dtoName} {`,
    `  @Prop({ enum: P.$Enums.${modelName} }) equals?: P.$Enums.${modelName}`,
    `  @Prop({ enum: P.$Enums.${modelName} }) in?: P.$Enums.${modelName}[] `,
    `  @Prop({ enum: P.$Enums.${modelName} }) notIn?: P.$Enums.${modelName}[] `,
    `  @Prop({ enum: P.$Enums.${modelName} }) not?: ${dtoName} `,
    `}`,
  ].join('\n');
}

export function printEnumDtos(datamodel: DMMF.Datamodel) {
  const enumModels = datamodel.enums;

  if (enumModels.length === 0) {
    return 'export const thereIsNoEnumModelsInDatabase=true; ';
  }

  const enumFilterDtos = enumModels
    .map((model) => printEnumFilterDto(model))
    .join('\n\n');

  const imports = [
    `import { Prop } from '@aenode/prop';`,
    `import   * as P from './prisma.js';`,
  ].join('\n');

  return [imports, enumFilterDtos].join('\n');
}
