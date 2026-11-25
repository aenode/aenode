import { format } from 'node:path';

export function names() {
  return format({ base: 'some' });
}
