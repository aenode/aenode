import { Type } from 'class-transformer';
import { ValidateNested, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropObjectOptions } from './prop-options.js';

export function PropObject(
  options?: PropObjectOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    options ??= {};
    const type = Reflect.getMetadata('design:type', ...args);
    validationOptions ??= {
      each: options?.isArray ?? type === Array,
      groups: options?.groups,
    };

    options.type ??= () => type;
    DefaultValueTransformer(options)(...args);
    Type(options.type)(...args);
    ValidateNested(validationOptions)(...args);
  };
}
