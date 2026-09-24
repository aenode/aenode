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
  | (() => ClassConstructor<unknown>);

export type CommonValidationOptions = {
  type?: PropType;
  required?: boolean;
  groups?: string[];

  maxItems?: number;
  minItems?: number;
  defaultValue?: unknown;
};

export type StringValidationOptions = {
  format?: StringFormat;
  minLength?: number;
  maxLength?: number;
  isIn?: string[];
  isNotIn?: string[];
} & CommonValidationOptions;

export type NumberValidationOptions = {
  format?: NumberFormat;
  min?: number;
  max?: number;
  isIn?: number[];
  isNotIn?: number[];
} & CommonValidationOptions;

export type BooleanValidationOptions = {} & CommonValidationOptions;

export type DateType = Date | (() => Date);

export type DateValidationOptions = {
  type?: Date;
  minDate?: DateType;
  maxDate?: DateType;
  isIn?: DateType[];
  isNotIn?: DateType[];
} & CommonValidationOptions;

export type EnumValidationOptions = {
  enum?: object;
  isIn?: (string | number)[];
} & CommonValidationOptions;

export type ObjectValidationOptions = {
  type?: () => ClassConstructor<unknown>;
  isArray?: boolean;
} & CommonValidationOptions;

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
} & CommonValidationOptions;
