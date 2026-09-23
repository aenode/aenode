import type { ClassConstructor } from 'class-transformer';
import 'reflect-metadata';

export type StringFormat =
  | 'email'
  | 'password'
  | 'uuid'
  | 'uuid4'
  | 'uuid7'
  | 'name'
  | 'ean'
  | 'json'
  | 'url'
  | 'data-uri';

export type NumberFormat = 'integer' | 'positive' | 'percent';
export type PropFormat = StringFormat | NumberFormat;

export type PropType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | ClassConstructor<unknown>
  | (() => ClassConstructor<unknown>);

export type PropCommonOptions<DefualtValue> = {
  type?: PropType;
  required?: boolean;
  groups?: string[];
  description?: string;
} & (
  | {
      isArray?: false;
      defaultValue?: DefualtValue;
    }
  | {
      isArray: true;
      maxItems?: number;
      minItems?: number;
      defaultValue?: DefualtValue[];
    }
);

export type PropStringOptions = {
  type?: StringConstructor;
  format?: StringFormat;
  minLength?: number;
  maxLength?: number;
  isIn?: string[];
  isNotIn?: string[];
} & PropCommonOptions<string>;

export type PropNumberOptions = {
  type?: NumberConstructor;
  format?: NumberFormat;
  min?: number;
  max?: number;
  isIn?: number[];
  isNotIn?: number[];
} & PropCommonOptions<number>;

export type PropBooleanOptions = {
  type?: BooleanConstructor;
} & PropCommonOptions<boolean>;

export type DateType = Date | (() => Date);

export type PropDateOptions = {
  type?: Date;
  min?: DateType;
  max?: DateType;
  isIn?: DateType[];
  isNotIn?: DateType[];
} & PropCommonOptions<Date>;

export type PropEnumOptions = {
  type?: 'Enum';
  enum: object;
} & PropCommonOptions<string>;

export type PropObjectOptions = {
  type?: () => ClassConstructor<unknown>;
} & PropCommonOptions<object>;

export type PropOptions =
  | PropStringOptions
  | PropNumberOptions
  | PropBooleanOptions
  | PropDateOptions
  | PropEnumOptions
  | PropObjectOptions;
