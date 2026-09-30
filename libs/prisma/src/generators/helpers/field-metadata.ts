import type { DMMF } from '@prisma/generator-helper';

export class FieldMetadata {
  constructor(protected readonly field: DMMF.Field) {}

  private get doc() {
    return this.field.documentation ?? '';
  }

  get enum() {
    if (this.field.kind === 'enum') {
      return `P.$Enums.${this.field.type}`;
    }
    return undefined;
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

  get isArray() {
    return this.field.isList;
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
      return;
    }

    return this.field.isRequired === true ? true : undefined;
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

  get include() {
    return this.has('include');
  }

  get isDtoField() {
    return [this.isReadField, this.isInputField, this.isUpdateField].some(
      (e) => e === true,
    );
  }

  get isReadField() {
    return [
      this.isRelationField,
      this.internal,
      this.hidden,
      this.writeonly,
    ].every((e) => e === false);
  }

  get isInputField() {
    return [
      this.isRelationField,
      this.isAuditField,
      this.isTimestampField,
      this.isGeneratedId,
      this.readonly,
    ].every((e) => e === false);
  }

  get isUpdateField() {
    if (this.readonly) {
      return false;
    }
    return this.isInputField;
  }

  get filterType() {
    switch (this.field.kind) {
      case 'scalar': {
        switch (this.field.type) {
          case 'String': {
            return 'P.StringFilterDto';
          }
          case 'Int':
          case 'Decimal':
          case 'Number': {
            return 'P.NumberFilterDto';
          }
          case 'Boolean': {
            return 'P.BooleanFilterDto';
          }
          case 'DateTime': {
            return 'P.DateFilterDto';
          }
          case 'Json': {
            return 'P.JSONFilterDto';
          }
        }
        throw new Error(`Unkown type ${this.field.type}`);
      }
      case 'enum': {
        return `P.Enum${this.field.type}FilterDto`;
      }
      case 'object':
      case 'unsupported': {
        throw new Error('Not supoorted');
      }
    }
  }

  get type() {
    return this.valueOf('type');
  }

  get tsPrimitiveType() {
    if (this.type) {
      return this.type;
    }

    switch (this.field.kind) {
      case 'scalar': {
        switch (this.field.type) {
          case 'Json':
          case 'String': {
            return 'string';
          }
          case 'Boolean':
            return 'boolean';
          case 'Int':
          case 'Decimal':
            return 'number';
          case 'DateTime':
            return 'Date';
        }
        break;
      }
      case 'enum': {
        return `P.$Enums.${this.field.type}`;
      }
      case 'unsupported': {
        throw new Error(
          `Unsupored, ${this.name}, types should be typed explictly`,
        );
      }
      case 'object': {
        throw new Error(
          `Object field, ${this.name}, is not valid in this context`,
        );
      }
    }

    throw new Error(`Could not reesolve the type of ${this.name}`);
  }

  get tsType() {
    return `${this.tsPrimitiveType}${this.field.isList ? '[]' : ''}`;
  }
}
