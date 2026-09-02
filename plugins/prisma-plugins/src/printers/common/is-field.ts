import type { DMMF } from '@prisma/generator-helper';

/**
 * Check the field is marked with "@internal" annotation or not
 *
 * @param field
 * @returns
 */
export function hasInternalAnnotation(field: DMMF.Field) {
  return /@internal|@hidden/i.test(field.documentation ?? '');
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
        hasInternalAnnotation(field) ||
        isTimestampField(field)
      ) {
        return false;
      } else {
        return field.isRequired === true || hasRequiredAnnotation(field);
      }
    }
  }
}
export function isReadDtoField(field: DMMF.Field) {
  if (hasInternalAnnotation(field)) {
    return false;
  }
  switch (field.kind) {
    case 'object': {
      return isIncludeField(field);
    }
    case 'scalar':
    case 'enum':
    case 'unsupported': {
      return true;
    }
  }
}
export function isCreateDtoField(field: DMMF.Field) {
  return !(
    field.kind === 'object' ||
    hasInternalAnnotation(field) ||
    isIdField(field) ||
    isTimestampField(field)
  );
}

export function hasReadonlyAnnotation(field: DMMF.Field): boolean {
  return /@readonly/i.test(field.documentation ?? '');
}

export function hasWriteOnlyAnnotation(field: DMMF.Field): boolean {
  return /@writeonly/i.test(field.documentation ?? '');
}

/**
 * Check the field does not have "@writeonly" annotation
 * @param field
 * @returns
 */
export function isUpdateDtoField(field: DMMF.Field) {
  if (isCreateDtoField(field)) {
    return !(hasWriteOnlyAnnotation(field) || hasReadonlyAnnotation(field));
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
  if (field.kind === 'object') {
    return hasIncludeAnnotation(field);
  }

  return false;
}

/**
 * Check the object field is marked with "@select" annotation or not
 *
 * @param field
 * @returns
 */
export function isSelectField(field: DMMF.Field) {
  if (field.kind === 'object') {
    return isIncludeField(field);
  }
  return !hasInternalAnnotation(field);
}

export function isOmitField(field: DMMF.Field) {
  if (
    hasInternalAnnotation(field) ||
    hasHashAnnotation(field) ||
    hasEncriptedAnnotaiton(field)
  ) {
    return false;
  }
  return field.kind !== 'object';
}

export function hasIncludeAnnotation(field: DMMF.Field) {
  return /@include|@select/i.test(field.documentation ?? '');
}

export function hasWhereAnnotation(field: DMMF.Field) {
  return /@where/i.test(field.documentation ?? '');
}
/**
 * Check the field is queryable. For object/relation field "@where" annotation is required to include the field in query operation.
 *
 * @param field
 * @returns
 */
export function isWhereField(field: DMMF.Field): boolean {
  if (field.kind === 'object') {
    return hasIncludeAnnotation(field) || hasWhereAnnotation(field);
  }
  return !hasInternalAnnotation(field);
}

export function isOrderByField(field: DMMF.Field): boolean {
  if (field.kind === 'object') {
    return isIncludeField(field);
  }

  if (hasInternalAnnotation(field)) {
    return false;
  }

  return true;
}
