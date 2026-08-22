import { UndefinedError } from '@aenode/errors';
import { type DeepPartial, type KeyOf, type Some } from '@aenode/types';

export function isInvalidDate(value: Date): boolean {
  return value.toString() === new Date('Invalid Date').toString();
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isEmptyString(value: unknown): value is '' {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      return true;
    }
  }

  return false;
}

export function isObject(value: unknown): value is object {
  if (isDefined(value) && typeof value === 'object' && !Array.isArray(value)) {
    return true;
  }

  return false;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function keys<T extends object, K extends KeyOf<T> = KeyOf<T>>(
  value: T,
): K[] {
  return Object.keys(value) as K[];
}

export function pick<T extends object, K extends keyof T = keyof T>(
  value: T,
  ...keysToPick: K[]
): Pick<T, K> {
  return keysToPick.reduce(
    (acc, key) => {
      acc[key] = value[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

export function pickDefinedValue<T extends object>(value: T): T {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (isDefined(value)) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as T);
}

export function pickValidValue<T extends object>(value: T): T {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (isValid(value)) {
      (acc as any)[key] = value;
    }
    return acc;
  }, {} as T);
}

export function pickInvalidValue<T extends object>(value: T): T {
  return Object.entries(value).reduce((acc, [key, value]) => {
    if (!isValid(value)) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as T);
}

export function omit<T extends object, K extends KeyOf<T>>(
  value: T,
  ...keysToOmit: K[]
): Omit<T, K> {
  return keys<T, K>(value).reduce(
    (acc, key) => {
      if (!new Set(keysToOmit).has(key)) {
        (acc as T)[key] = value[key];
      }
      return acc;
    },
    {} as Omit<T, K>,
  );
}

export function isEmptyObject<T extends object>(value: T): boolean {
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}

/**
 * Determine the value is defined and not NaN or InvalidDate
 *
 * @param value
 * @returns
 */
export function isValid<T>(value: Some<T>): value is T {
  if (!isDefined(value)) {
    return false;
  }

  if (isNumber(value)) {
    return !isNaN(value);
  }

  if (isDate(value)) {
    return !isInvalidDate(value);
  }

  return true;
}

export function isDefined<T>(value: Some<T>): value is T {
  return value !== undefined && value !== null;
}

export function isDefinedOrThrow<T>(value: Some<T>): value is T {
  if (isDefined(value)) {
    return true;
  }
  throw new UndefinedError();
}

export function merge<T extends object>(
  ...values: DeepPartial<T>[]
): DeepPartial<T> {
  return values
    .map((value) => pickValidValue(value))
    .reduce((acc, value) => {
      acc = { ...acc, ...value };
      return acc;
    }, {} as T);
}
