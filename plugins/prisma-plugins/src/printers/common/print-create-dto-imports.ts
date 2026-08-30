import type { DMMF } from '@prisma/generator-helper';

export function printCreateDtoImports(model: DMMF.Model): string {
  return `/// ${model.name} - [  ] addd code here`;
}
