export type ClassType =
  | { new (...args: any[]): any }
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | BufferConstructor
  | BigIntConstructor
  | SymbolConstructor;

export const PropType = {
  String: 'String',
  Json: 'Json',
  Number: 'Number',
  Boolean: 'Boolean',
  Date: 'Date',
  Buffer: 'Buffer',
  Object: 'Object',
};

export type PropType = keyof typeof PropType;

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

export type PropValidationOptions = {
  name?: string;
  description?: string;

  /**
   * This property is internaly used to store the target type name
   */
  typeName?: PropType;

  /**
   * This property is required for object and array properties. Primitive types are infered from the reflect-metadata.
   *
   * @returns
   */
  type?: () => ClassType;

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
   * Defines format such as email, password, ean, uuid etc.
   */
  format?: string;

  /**
   * Dependent properties
   */
  dependencies?: PropDependencyOptions;
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

  /**
   * Specifies the transform and validation groups that determine swhether this property is included when performing the operation.
   */
  groups?: string[];
};
