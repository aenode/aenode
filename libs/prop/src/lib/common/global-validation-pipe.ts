import {
  UnprocessableEntityException,
  ValidationPipe,
} from '@aenode/nest/common';
import type { ClassTransformOptions } from '@aenode/nest/transformer';
import { toValidationErrorDto } from './to-validation-error-dto.js';

export const globalTransformOptions: ClassTransformOptions = {
  excludeExtraneousValues: true,
  exposeDefaultValues: false,
  exposeUnsetFields: false,
};

export const globalValidationPipe = new ValidationPipe({
  transform: true,
  transformOptions: globalTransformOptions,
  validationError: { target: false, value: false },
  exceptionFactory(validationErrors) {
    const errors = validationErrors.flatMap((error) => {
      return toValidationErrorDto(error);
    });

    throw new UnprocessableEntityException({ errors });
  },
});
