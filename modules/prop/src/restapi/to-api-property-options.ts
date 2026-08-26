import { type PropValidationOptions } from '@aenode/prop-validation';
import { type ApiPropertyOptions } from '@nestjs/swagger';

export function toApiPropertyOptions(
  options: PropValidationOptions,
): ApiPropertyOptions {
  const required = options.isRequired === true;

  return {
    type: options.type,
    required,
    nullable: required === false,
    minLength: options.minLength,
    maxLength: options.maxLength,
    maximum: options.max,
    minimum: options.min,
    format: options.format,
    default: options.defaultValue,
    pattern: options.pattern,
    maxItems: options.maxItems,
    minItems: options.minItems,
    description: options.description,
  };
}
