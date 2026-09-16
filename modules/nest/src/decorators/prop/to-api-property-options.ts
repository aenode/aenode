import type { PropValidationOptions } from '@aenode/prop-validation';
import type { ApiPropertyOptions } from '@nestjs/swagger';

export function toApiPropertyOptions(
  options:
    | PropValidationOptions
    | Omit<ApiPropertyOptions, keyof PropValidationOptions>,
): ApiPropertyOptions {
  return options;
}
