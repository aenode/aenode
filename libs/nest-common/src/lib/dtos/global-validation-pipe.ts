import {
  UnprocessableEntityException,
  ValidationPipe,
  type ValidationError,
} from '@nestjs/common';
import { inspect } from 'node:util';
import { type ValiationErrorDto } from './response-types.js';

function toValidationErrorDto(error: ValidationError): ValiationErrorDto[] {
  const children: ValiationErrorDto[] = error.children
    ? error.children.flatMap((c) => toValidationErrorDto(c))
    : [];

  return [
    ...children,
    ...Object.entries(error.constraints ?? {}).map(([constraint, message]) => {
      return {
        property: error.property,
        constraint,
        message,
      } as ValiationErrorDto;
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
