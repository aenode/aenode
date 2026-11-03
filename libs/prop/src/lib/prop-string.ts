import { ApiProperty } from '@aenode/nest/swagger';
import type { PropOptions } from './prop-options.js';

export function PropString(options?: PropOptions): PropertyDecorator {
  return (...args) => {
    ApiProperty(options)(...args);
  };
}
