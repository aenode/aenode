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
  const enumFilterDtos = datamodel.enums
    .map((model) => printEnumFilterDto(model))
    .join('\n\n');

  const imports = [
    `import { Prop } from '@aenode/nest';`,
    `import   * as P from './prisma.js';`,
  ].join('\n');

  return [imports, enumFilterDtos].join('\n');
}
