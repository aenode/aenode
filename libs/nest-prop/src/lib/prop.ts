import { PropObjectValidation, PropValidation } from '@aenode/prop';
import { ApiProperty } from '@nestjs/swagger';
import type { PropObjectOptions, PropOptions } from './prop-options.js';
import { toApiProeprtyOptions } from './to-api-property-optionts.js';

export function PropObject(options: PropObjectOptions): PropertyDecorator {
  return (...args) => {
    const apiPropertyOptions = toApiProeprtyOptions(options, ...args);
    PropObjectValidation(options)(...args);
    ApiProperty(apiPropertyOptions)(...args);
  };
}

export function Prop(options?: PropOptions): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const apiPropertyOptions = toApiProeprtyOptions(options, ...args);

    options.default ??= options.defaultValue;
    options.defaultValue ??= options.default;

    PropValidation(options)(...args);
    ApiProperty(apiPropertyOptions)(...args);
  };
}
