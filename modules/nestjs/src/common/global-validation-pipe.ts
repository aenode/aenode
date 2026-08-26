import {
  BadRequestException,
  type Provider,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export class InputValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      transformOptions: {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
        exposeDefaultValues: true,
      },
      exceptionFactory(errors) {
        return new BadRequestException({ errors });
      },
    });
  }
}

export function provdeGlobalInputValidationPipe(): Provider {
  return {
    provide: APP_PIPE,
    useClass: InputValidationPipe,
  };
}
