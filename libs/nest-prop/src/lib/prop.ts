import { PropValidation, type PropValidationOptions } from '@aenode/prop';
import { ApiProperty } from '@nestjs/swagger';
import { toApiProeprtyOptions } from './to-api-property-optionts.js';

export function Prop(options?: PropValidationOptions): PropertyDecorator {
  return (...args) => {
    options ??= {};
    PropValidation(options)(...args);
    ApiProperty(toApiProeprtyOptions(options, ...args))(...args);
  };
}
