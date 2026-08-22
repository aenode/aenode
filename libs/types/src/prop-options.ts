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

export type PropFormat =
  | 'email'
  | 'password'
  | 'uuid'
  | 'ean'
  | 'phone'
  | 'url'
  | 'ip4'
  | 'ip6'
  | 'jwt'
  | 'currency';

export type PropDependencyOptions = {
  isMoreThan?: string;
  isMoreThanOrEqualTo?: string;

  isLessThan?: string;
  isLessThanOrEqualTo?: string;

  isEqualTo?: string;
  isNotEqualTo?: string;
};

export type PropOptions = {
  name?: string;
  description?: string;

  type?: PropType;
  isArray?: boolean;

  examples?: string[];
  isRequired?: boolean;
  isIn?: object;
  isNotIn?: object;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: string;

  isEncriped?: string;
  isHashed?: string;
  isInternal?: boolean;
  isReadonly?: boolean;
  isWriteonly?: boolean;
  isTimestamp?: boolean;
  isUuid?: boolean;
  isId?: boolean;
  isUnique?: boolean;

  groups?: string[];
};
