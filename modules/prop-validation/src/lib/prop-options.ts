import type { ClassConstructor } from 'class-transformer';
import type { ValidationOptions } from 'class-validator';

export class StringArray extends Array<string> {
  readonly type: StringConstructor;
}

export class NumberArray extends Array<string> {
  readonly type: NumberConstructor;
}

export class BooleanArray extends Array<string> {
  readonly type: BooleanConstructor;
}

export class DateArray extends Array<string> {
  readonly type: DateConstructor;
}

export type PropType = <T>() => ClassConstructor<T>;

export type StringFormat =
  | 'email'
  | 'password'
  | 'ean'
  | 'uuid'
  | 'uuid4'
  | 'uuid7'
  | 'ip6'
  | 'ip4';

export type NumberFormat = 'int' | 'integer';

export type PropFormat = StringFormat | NumberFormat;

export type PropOptions = {
  desc?: string;
  type?: PropType;
  isArray?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number | Date | (() => Date);
  min?: number | Date | (() => Date);
  format?: PropFormat;
  isIn?: string[];
  isNotIn?: string[];
  moreThan?: string | string[];
  lessThen?: string | string[];
  moreThanEqualTo?: string | string[];
  lessThenEqualTo?: string | string[];
  groups?: string[];
  validateIf?: ValidationOptions['validateIf'];
};
