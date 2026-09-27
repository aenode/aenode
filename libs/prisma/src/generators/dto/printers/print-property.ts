import type { DMMF } from '@prisma/generator-helper';
import { FieldMetadata } from '../../helpers/field-metadata.js';
import { toWritableOptions } from '../../helpers/to-writable-options.js';

export function printProperty(field: DMMF.Field, isOptional?: boolean) {
  const meta = new FieldMetadata(field);

  const optional = isOptional === true ? '?' : meta.required ? '' : '?';

  return `@Prop(${toWritableOptions(meta)}) ${meta.name}${optional}: ${meta.tsType};`;
}
