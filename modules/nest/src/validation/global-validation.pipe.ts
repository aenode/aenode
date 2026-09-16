import { ValidationPipe } from '@nestjs/common';
import { exceptionFactory } from './exception-factory.js';

export const globalValidationPipe = new ValidationPipe({
  transform: true,
  validationError: { target: false, value: true },
  transformOptions: {
    exposeDefaultValues: false,
    exposeUnsetFields: false,
    excludeExtraneousValues: true,
  },
  exceptionFactory: (errors) => exceptionFactory(errors),
});
