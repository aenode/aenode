import { type PropValidationOptions } from '@aenode/prop-validation';
import { type ApiPropertyOptions } from '@nestjs/swagger';

export function toApiPropertyOptions(
  options: PropValidationOptions,
): ApiPropertyOptions {
  const required = options.isRequired === true;

  const common: ApiPropertyOptions = {
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

  if (options.type) {
    return { ...common, type: options.type };
  } else if (options.enum) {
    return { ...common, enum: options.enum };
  } else if (options.object) {
    return { ...common, type: options.object };
  } else if (options.isArray) {
    throw new Error(
      `One of type, enum, or object option must be provided for an array properties`,
    );
  }

  return { ...common };
}
