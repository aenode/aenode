import type { DMMF } from '@prisma/generator-helper';

export class FieldMetadata {
  constructor(protected readonly field: DMMF.Field) {}

  private get doc() {
    return this.field.documentation ?? '';
  }
  private has(name: keyof FieldMetadata): boolean {
    return !!this.doc.match(new RegExp(`@${name}`, 'i'));
  }

  private valueOf(name: keyof FieldMetadata): string | undefined {
    const matched = this.doc.match(new RegExp(`@${name}\\((\\w+)\\)`, 'i'));
    return matched?.[1];
  }
  private arrayStrValue(name: keyof FieldMetadata): string[] | undefined {
    const matchedValue = this.valueOf(name);

    if (matchedValue) {
      return matchedValue.split(',');
    }
    return undefined;
  }

  private numValue(name: keyof FieldMetadata): number | undefined {
    const matchedValue = this.valueOf(name);

    if (matchedValue) {
      return parseFloat(matchedValue as string);
    }
    return undefined;
  }

  get name() {
    return this.field.name;
  }

  get relationName() {
    return this.field.relationName;
  }

  get required() {
    if (this.has('required')) {
      return true;
    }

    if (this.field.hasDefaultValue) {
      return false;
    }

    return this.field.isRequired === true;
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

  get isRelationField() {
    return this.field.kind === 'object';
  }

  get isGeneratedId() {
    if (
      this.field.hasDefaultValue &&
      this.field.default &&
      (this.field.default as DMMF.FieldDefault).name
    ) {
      const defaultName = (this.field.default as DMMF.FieldDefault)?.name;

      return defaultName === 'autoincrement' || defaultName === 'uuid';
    }
    return false;
  }

  get isTimestampField() {
    return /(created|updated|deleted)At/i.test(this.field.name);
  }

  get isAuditField() {
    return /(created|updated|deleted)By/i.test(this.field.name);
  }

  get isInputField() {
    return !(
      this.isRelationField ||
      this.isAuditField ||
      this.isTimestampField ||
      this.isGeneratedId ||
      this.readonly
    );
  }

  get isUpdateField() {
    if (this.readonly) {
      return false;
    }
    return this.isInputField;
  }
}
