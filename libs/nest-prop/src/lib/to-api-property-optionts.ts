import type { PropValidationOptions } from '@aenode/prop';
import type { ApiPropertyOptions } from '@nestjs/swagger';
import 'reflect-metadata';

export function toApiProeprtyOptions(
  options: PropValidationOptions,
  ...args: Parameters<PropertyDecorator>
): ApiPropertyOptions {
  const inferedType = Reflect.getMetadata('design:type', ...args);

  const isArrayType = inferedType === Array;

  const apiOptions: ApiPropertyOptions = {
    required: options.required === true,
    nullable: options.required !== true,
    minimum: options.max,
    maximum: options.max,
    minLength: options.minLength,
    maxLength: options.maxLength,
    isArray: isArrayType,
    description: options.description,
    example: options.example,
    examples: options.examples,
    enum: options.enum,
    minItems: options.minItems,
    maxItems: options.maxItems,
  };

  if (isArrayType === true) {
    if (!options.type && !options.enum) {
      throw new Error(
        'Array property must provide type, enum, or isIn option!',
      );
    }

    apiOptions.type = options.type;
  }

  return apiOptions;
}
