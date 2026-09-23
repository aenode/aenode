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

export type PropCommonOptions = {
  type?: PropType;
  required?: boolean;
  groups?: string[];
  description?: string;

  maxItems?: number;
  minItems?: number;
  defaultValue?: unknown;
};

export type PropStringOptions = {
  format?: StringFormat;
  minLength?: number;
  maxLength?: number;
  isIn?: string[];
  isNotIn?: string[];
} & PropCommonOptions;

export type PropNumberOptions = {
  format?: NumberFormat;
  min?: number;
  max?: number;
  isIn?: number[];
  isNotIn?: number[];
} & PropCommonOptions;

export type PropBooleanOptions = {} & PropCommonOptions;

export type DateType = Date | (() => Date);

export type PropDateOptions = {
  type?: Date;
  minDate?: DateType;
  maxDate?: DateType;
  isIn?: DateType[];
  isNotIn?: DateType[];
} & PropCommonOptions;

export type PropEnumOptions = {
  enum: object;
} & PropCommonOptions;

export type PropObjectOptions = {
  type?: () => ClassConstructor<unknown>;
} & PropCommonOptions;

export type PropValidationOptions = {
  type?: PropType;
  enum?: object;
  format?: PropFormat;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minDate?: DateType;
  maxDate?: DateType;
  isIn?: unknown[];
  isNotIn?: unknown[];
  example?: unknown;
  examples?: Record<string, unknown>;
} & PropCommonOptions;
