/* eslint-disable @typescript-eslint/no-explicit-any */

export type ClassType<T = any> = {
  new (...args: any[]): T;
};

export const PropType = {
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
  Date: 'Date',
};

export type PropType = keyof typeof PropType;

export type PropFormat =
  | 'email'
  | 'uuid'
  | 'alpha'
  | 'alphanumeric'
  | 'ascii'
  | 'bic'
  | 'base32'
  | 'base64'
  | 'base58'
  | 'date'
  | 'boolean'
  | 'json'
  | 'password'
  | 'btc-address'
  | 'credit-card'
  | 'data-uri'
  | 'currency'
  | 'ean'
  | 'hsl'
  | 'hash'
  | 'jwt'
  | 'fqdn'
  | 'isbn'
  | 'semver'
  | 'iban'
  | 'phone'
  | 'passport-number';

export type PropDependencyOptions = {
  isMoreThan?: string;
  isMoreThanOrEqualTo?: string;

  isLessThan?: string;
  isLessThanOrEqualTo?: string;

  isEqualTo?: string;
  isNotEqualTo?: string;

  isBefore?: string;

  isAfter?: string;

  required?: string[];

  notWith?: string[];
};

export type PropertyFormat = 'email' | 'password';

export const PropertyType = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Date: Date,
};
export type PropValidationOptions = {
  /**
   * Property name
   */
  name?: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Primitive property type
   *
   * @returns
   */
  type?: () =>
    | StringConstructor
    | NumberConstructor
    | BooleanConstructor
    | DateConstructor;

  /**
   * Object type
   * @returns
   */
  object?: () => ClassType;

  /**
   * Enum type
   */
  enum?: () => object;

  /**
   * Defines if the property is a type of array or not.
   * Array properties require the type option.
   */
  isArray?: boolean;

  /**
   * Defines if the property is required or optional
   */
  isRequired?: boolean;

  /**
   * Defines if the property is the one of the values or enum
   */
  isIn?: string[] | number[];

  /**
   * Defines if the property is NOT the one of the values or enum
   */
  isNotIn?: string[] | number[];

  /**
   * Defines the minimum allowed numeric value
   */
  min?: number;

  /**
   * Defines the maximum allowed numeric value
   */
  max?: number;

  /**
   * Defines minimum required length for string value
   */
  minLength?: number;

  /**
   * Defines maximum required length for string value
   */
  maxLength?: number;

  /**
   * Defines allowed pattern
   */
  pattern?: string;

  /**
   * Defines minimum allowed number of items in an array
   */
  minItems?: number;

  /**
   * Defines maximum allowed number of items in an array
   */
  maxItems?: number;

  /**
   * Defines format such as email, password, ean, uuid etc.
   */
  format?: PropertyFormat;

  /**
   * Maximum allowed date
   * @returns
   */
  maxDate?: () => Date;

  /**
   * Minimum allowed date
   * @returns
   */
  minDate?: () => Date;

  /**
   * Dependent properties
   */
  dependencies?: PropDependencyOptions;

  /**
   * By default all properties are exposed
   */
  excluded?: boolean;
  /**
   * Specifies the transform and validation groups that determine swhether this property is included when performing the operation.
   */
  groups?: string[];

  defaultValue?: any;
};

export type PropOptions = PropValidationOptions & {
  /**
   * Example values
   */
  examples?: string[];

  /**
   * Defines if the property is encripted or not
   */
  isEncriped?: boolean;

  /**
   * Defines if the property is hashed or not
   */
  isHashed?: boolean;

  /**
   * Defines if the property is an internal field that is ignored by the validation operation
   */
  isInternal?: boolean;

  /**
   * Defines if the property is readonly that is ignored by the update operation
   */
  isReadonly?: boolean;

  /**
   * Defines if the propery is writeonly that is ignored by the read operations
   */
  isWriteonly?: boolean;

  /**
   * Defines if the property is one of created, updated, or deleted at timestamps
   */
  isTimestamp?: boolean;

  /**
   * Defines if the property is a type of uuid
   */
  isUuid?: boolean;

  /**
   * Defines if the property is a type of id
   */
  isId?: boolean;

  /**
   * Defines if the property is unique or not
   */
  isUnique?: boolean;
};
