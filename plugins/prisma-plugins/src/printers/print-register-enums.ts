import type { DMMF } from '@prisma/generator-helper';

export function printRegisterEnums(models: DMMF.Model[]) {
  return models
    .map((m) => {
      return `F.registerEnumType(P.Prisma.${m.name}ScalarFieldEnum, { name: '${m.name}ScalarFieldEnum' });`;
    })
    .join('\n');
}
