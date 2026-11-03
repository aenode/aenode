import { ApiProperty } from '@aenode/nest/swagger';
import type { PropOptions } from './prop-options.js';
import { PropValidation } from './prop-validation.js';
import { toApiProeprtyOptions } from './to-api-property-optionts.js';

export function Prop(options?: PropOptions): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const apiPropertyOptions = toApiProeprtyOptions(options, ...args);

    PropValidation(options)(...args);
    ApiProperty(apiPropertyOptions)(...args);
  };
}
