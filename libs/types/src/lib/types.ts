import type { Some } from './some.js';

export function types<T extends string>(value: Some<T>): Some<T> {
  return value;
}
