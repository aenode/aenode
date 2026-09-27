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

export class FieldAnnotations {
  constructor(protected readonly field: DMMF.Field) {}

  private get doc() {
    return this.field.documentation ?? '';
  }
  private has(name: keyof FieldAnnotations): boolean {
    return !!this.doc.match(new RegExp(`@${name}`, 'i'));
  }

  private valueOf(name: keyof FieldAnnotations): string | undefined {
    const matched = this.doc.match(new RegExp(`@${name}\\((\\w+)\\)`, 'i'));
    return matched?.[1];
  }
  private arrayStrValue(name: keyof FieldAnnotations): string[] | undefined {
    const matchedValue = this.valueOf(name);

    if (matchedValue) {
      return matchedValue.split(',');
    }
    return undefined;
  }

  private numValue(name: keyof FieldAnnotations): number | undefined {
    const matchedValue = this.valueOf(name);

    if (matchedValue) {
      return parseFloat(matchedValue as string);
    }
    return undefined;
  }

  get required() {
    return this.has('required');
  }
  get internal() {
    return this.has('internal');
  }

  get hidden() {
    return this.has('hidden');
  }

  get readonly() {
    return this.has('readonly');
  }

  get writeonly() {
    return this.has('writeonly');
  }

  get min() {
    return this.numValue('min');
  }
  get max() {
    return this.numValue('max');
  }
  get minLength() {
    return this.numValue('minLength');
  }
  get maxLength() {
    return this.numValue('maxLength');
  }
  get format() {
    return this.valueOf('format');
  }
  get moreThan() {
    return this.arrayStrValue('moreThan');
  }
  get lessThan() {
    return this.arrayStrValue('lessThan');
  }
  get isIn() {
    return this.arrayStrValue('isIn');
  }
  get isNotIn() {
    return this.arrayStrValue('isNotIn');
  }
  get description() {
    return this.valueOf('description');
  }
}
