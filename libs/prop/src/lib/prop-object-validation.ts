import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { __PropCommon } from './prop-common.js';
import type { PropObjectOptions } from './prop-options.js';

export function PropObjectValidation(
  options: PropObjectOptions & Required<Pick<PropObjectOptions, 'type'>>,
): PropertyDecorator {
  return (...args) => {
    const validationOptions = {
      each: options.isArray,
      groups: options?.groups,
    };

    __PropCommon(options, validationOptions)(...args);

    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
