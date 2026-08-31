import type { DMMF } from '@prisma/generator-helper';

/**
 * Check the field is marked with "@internal" annotation or not
 *
 * @param field
 * @returns
 */
export function isInternalField(field: DMMF.Field) {
  return /@internal/i.test(field.documentation ?? '');
}

/**
 * Check the field is a timestamp field by name, createdat, updatedat, or deletedat.
 *
 * @param field
 * @returns
 */
export function isTimestampField(field: DMMF.Field) {
  return /^createdat|updatedat|deletedat$/i.test(field.name);
}

/**
 * Check the field is id or auto generated uuid field
 * @param field
 * @returns
 */
export function isIdField(field: DMMF.Field) {
  return (
    field.isId ||
    (field.default as DMMF.FieldDefault)?.name === 'uuid' ||
    (field.default as DMMF.FieldDefault)?.name === 'autoincrement'
  );
}

export function hasRequiredAnnotation(field: DMMF.Field) {
  return /@required/i.test(field.documentation ?? '');
}

export function hasEncriptedAnnotaiton(field: DMMF.Field) {
  return /@encript/i.test(field.documentation ?? '');
}

export function hasHashAnnotation(field: DMMF.Field) {
  return /@hash/i.test(field.documentation ?? '');
}

/**
 * Check the field is required
 *
 * @param field
 * @returns
 */
export function isRequiredField(field: DMMF.Field) {
  switch (field.kind) {
    case 'object': {
      return hasRequiredAnnotation(field);
    }
    case 'unsupported':
    case 'enum':
    case 'scalar': {
      if (
        isIdField(field) ||
        isInternalField(field) ||
        isTimestampField(field)
      ) {
        return false;
      } else {
        return (
          field.isRequired === true ||
          /@required/i.test(field.documentation ?? '')
        );
      }
    }
  }
}

export function isCreateDtoField(field: DMMF.Field) {
  return !(
    field.kind === 'object' ||
    isInternalField(field) ||
    isIdField(field) ||
    isTimestampField(field)
  );
}

export function isReadOnlyField(field: DMMF.Field): boolean {
  return /@readonly/i.test(field.documentation ?? '');
}

export function isWriteOnlyField(field: DMMF.Field): boolean {
  return /@writeonly/i.test(field.documentation ?? '');
}

/**
 * Check the field does not have "@writeonly" annotation
 * @param field
 * @returns
 */
export function isUpdateDtoField(field: DMMF.Field) {
  if (isCreateDtoField(field)) {
    if (isWriteOnlyField(field) || isReadOnlyField(field)) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 * Check the object field is marked with "@include" annotations or not
 *
 * @param field
 * @returns
 */
export function isIncludeField(field: DMMF.Field) {
  if (field.kind !== 'object') {
    throw new Error(`This is for object fields`);
  }
  return /@include/i.test(field.documentation ?? '');
}

/**
 * Check the object field is marked with "@select" annotation or not
 *
 * @param field
 * @returns
 */
export function isSelectField(field: DMMF.Field) {
  if (field.kind !== 'object') {
    throw new Error(`This is for object fields`);
  }
  return /@select/i.test(field.documentation ?? '');
}

/**
 * Check the field is queryable. For object/relation field "@where" annotation is required to include the field in query operation.
 *
 * @param field
 * @returns
 */
export function isWhereField(field: DMMF.Field): boolean {
  if (isInternalField(field)) {
    return false;
  }
  if (field.kind === 'object') {
    return /@where/i.test(field.documentation ?? '');
  }
  return true;
}
