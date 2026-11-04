import {
  UnprocessableEntityException,
  ValidationPipe,
  type ValidationError,
} from '@aenode/nest/common';
import { inspect } from 'node:util';
import type { ValidationErrorDto } from './validation-error-response.dto.js';

function toValidationErrorDto(error: ValidationError): ValidationErrorDto[] {
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

export const globalValidationPipe = new ValidationPipe({
  transform: true,
  transformOptions: {
    excludeExtraneousValues: true,
    exposeDefaultValues: false,
    exposeUnsetFields: false,
  },
  exceptionFactory(validationErrors) {
    console.log(inspect(validationErrors, true, 100));
    const errors = validationErrors.flatMap((error) => {
      return toValidationErrorDto(error);
    });

    throw new UnprocessableEntityException({ errors });
  },
});
