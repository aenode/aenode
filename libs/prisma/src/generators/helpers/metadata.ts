import type { DMMF } from '@prisma/generator-helper';

export function isRelationField(field: DMMF.Field) {
  return field.kind === 'object';
}

export function isGeneratedId(field: DMMF.Field) {
  if (
    field.hasDefaultValue &&
    field.default &&
    (field.default as DMMF.FieldDefault).name
  ) {
    const defaultName = (field.default as DMMF.FieldDefault)?.name;

    return defaultName === 'autoincrement' || defaultName === 'uuid';
  }
  return false;
}

export function isTimestampField(field: DMMF.Field) {
  return /(created|updated|deleted)At/i.test(field.name);
}

export function isAuditField(field: DMMF.Field) {
  return /(created|updated|deleted)By/i.test(field.name);
}

export function isReadOnlyField(field: DMMF.Field) {
  return /@readonly/gi.test(field.documentation ?? '');
}

export function isWriteOnlyField(field: DMMF.Field) {
  return /@writeonly/gi.test(field.documentation ?? '');
}

export function isInternalField(field: DMMF.Field) {
  return /@(internal|hidden)/gi.test(field.documentation ?? '');
}

export function isRequiredField(field: DMMF.Field): boolean {
  if (field.hasDefaultValue) {
    return false;
  }

  return (
    /@required/i.test(field.documentation ?? '') || field.isRequired === true
  );
}

export function isInputField(field: DMMF.Field) {
  return !(
    isRelationField(field) ||
    isAuditField(field) ||
    isTimestampField(field) ||
    isGeneratedId(field) ||
    isInternalField(field)
  );
}

export function isUpdateField(field: DMMF.Field) {
  if (isReadOnlyField(field)) {
    return false;
  }
  return isInputField(field);
}
