import type { DMMF } from '@prisma/generator-helper';

export function printFieldDecorator(model: DMMF.Model, field: DMMF.Field) {
  return `
  /// ${model.name}
  /// ${field.name}
  @Prop()`;
}
