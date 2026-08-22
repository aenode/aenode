import type { KeyOf } from './types.js';

export const PropType = {
  String: 'String',
  Json: 'Json',
  Number: 'Number',
  Boolean: 'Boolean',
  Date: 'Date',
  Buffer: 'Buffer',
  Object: 'Object',
};

export type PropType = KeyOf<typeof PropType>;

export type PropFormat = string;

export type PropCommonOptions = {
  name?: string;
  required?: boolean;
  isIn?: object;
  isNotIn?: object;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;

  isInternal?: boolean;
  isReadonly?: boolean;
  isWriteonly?: boolean;
  isTimestamp?: boolean;
  isUuid?: boolean;
  isId?: boolean;
  isUnique?: boolean;
};
export type PropOptions = {
  type?: PropType;
  isArray?: boolean;
};
