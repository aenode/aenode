import type { DMMF } from '@prisma/generator-helper';

export function printClassDecorator(model: DMMF.Model) {
  return `/// ${model.name}`;
}
