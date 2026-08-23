import { InvalidNameError } from '@aenode/errors';
import type { Names } from '@aenode/types';

function transformAndValidateName(value: string) {
  if (typeof value !== 'string') {
    throw new InvalidNameError('Name is not string');
  }

  if (value === undefined || value === null) {
    throw new InvalidNameError('Name is undefined');
  }

  if (!/^[a-zA-Z_-]{1}[$a-zA-Z0-9_-\s]{1,}$/.test(value)) {
    throw new InvalidNameError('Name contains special characters');
  }

  const normalized = value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-\s_]{1,}/, ' ')
    .toLowerCase()
    .trim();

  if (normalized === '') {
    throw new InvalidNameError('Name is empty string');
  }

  return normalized;
}

function uppercaseFirst(value: string): string {
  return value[0]?.toUpperCase() + value.slice(1);
}

function lowercaseFirst(value: string): string {
  return value[0]?.toLowerCase() + value.slice(1);
}

export function names(value: string): Names {
  const normal = transformAndValidateName(value);
  const kebab = normal.replace(/\s/g, '-');

  const __title = normal.split(' ').map((v) => uppercaseFirst(v));
  const title = __title.join(' ');
  const pascal = __title.join('');
  const camel = lowercaseFirst(pascal);

  const snake = normal.replace(/\s/g, '_');
  const constant = snake.toUpperCase();
  const sentence = uppercaseFirst(normal);

  return {
    kebab,
    pascal,
    camel,
    constant,
    snake,
    title,
    sentence,
  };
}
