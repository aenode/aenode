import { PropValidation } from '@aenode/prop-validation';
import { ApiProperty } from '@nestjs/swagger';
import type { PropOptions } from './prop-options.js';
import { toApiPropertyOptions } from './to-api-property-options.js';

export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);
    ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
