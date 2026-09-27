import { names } from '@aenode/names';
import type { FieldMetadata } from './field-metadata.js';

export function toCode(value: unknown): string {
  if (typeof value === 'string') {
    return `'${value}'`;
  } else if (Array.isArray(value)) {
    return `[ ${value.map((v) => toCode(v)).join(',')} ]`;
  }
  return `${value}`;
}

export function toWritableOptions(meta: FieldMetadata): string {
  const options: string[] = [];

  const pushIfDefined = (key: keyof FieldMetadata) => {
    if (meta[key] !== undefined) {
      options.push(`${key}: ${toCode(meta[key])}`);
    }
  };

  pushIfDefined('required');
  pushIfDefined('format');
  pushIfDefined('isIn');
  pushIfDefined('isNotIn');
  pushIfDefined('min');
  pushIfDefined('max');
  pushIfDefined('minLength');
  pushIfDefined('maxLength');
  pushIfDefined('lessThan');
  pushIfDefined('moreThan');
  pushIfDefined('description');
  pushIfDefined('enum');

  if (meta.isArray) {
    options.push(`type: ${names(meta.tsPrimitiveType).pascal}`);
  }

  if (options.length > 0) {
    return ['{', options.join(','), '}'].join(' ');
  }

  return '';
}
