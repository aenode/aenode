import type { DMMF } from '@prisma/generator-helper';

export function printFieldDecoratorOptions(
  model: DMMF.Model,
  field: DMMF.Field,
) {
  return `{ name: '${field.name}', modelName: '${model.name}'}`;
}
