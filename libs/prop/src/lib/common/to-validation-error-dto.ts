import type { ValidationError } from '@aenode/nest/common';
import type { ValidationErrorDto } from './validation-error-response.dto.js';

export function toValidationErrorDto(
  error: ValidationError,
): ValidationErrorDto[] {
  const children: ValidationErrorDto[] = error.children
    ? error.children.flatMap((c) => toValidationErrorDto(c))
    : [];

  return [
    ...children,
    ...Object.entries(error.constraints ?? {}).map(([constraint, message]) => {
      return {
        property: error.property,
        constraint,
        message,
      } as ValidationErrorDto;
    }),
  ];
}
