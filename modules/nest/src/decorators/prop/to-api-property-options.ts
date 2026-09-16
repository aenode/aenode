import type { PropValidationOptions } from '@aenode/prop-validation';
import type { ApiPropertyOptions } from '@nestjs/swagger';

export function toApiPropertyOptions(
  options: PropValidationOptions &
    Omit<ApiPropertyOptions, keyof PropValidationOptions>,
): ApiPropertyOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isIn, isNotIn, format: _format, required, ...restOptions } = options;
  const enumLike = options.enum ?? isIn ?? isNotIn;
  return {
    ...restOptions,
    enum: enumLike,
    required: required === true,
    nullable: required !== true,
  };
}
