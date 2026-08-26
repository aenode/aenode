import {
  PropValidation,
  type PropValidationOptions,
} from '@aenode/prop-validation';
import { ApiProperty } from '@nestjs/swagger';
import { toApiPropertyOptions } from './to-api-property-options.js';

export function Prop(options: PropValidationOptions = {}): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);
    ApiProperty(toApiPropertyOptions(options))(...args);
  };
}
