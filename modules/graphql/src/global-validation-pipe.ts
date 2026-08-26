import {
  type Provider,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLError } from 'graphql';

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
        return new GraphQLError(UnprocessableEntityException.name, {
          extensions: { errors },
        });
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
