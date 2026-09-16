import { PropValidation } from '@aenode/prop-validation';
import { getPropType } from '@aenode/reflect';
import type { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { PropOptions } from './prop-options.js';
import { toApiPropertyOptions } from './to-api-property-options.js';

export function Prop(options: PropOptions = {}): PropertyDecorator {
  return (...args) => {
    PropValidation(options)(...args);
    const type = getPropType(args[0], args[1]) as Type;

    ApiProperty(toApiPropertyOptions({ ...options, example: new type() }))(
      ...args,
    );
  };
}
