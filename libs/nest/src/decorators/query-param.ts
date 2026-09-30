import { Query } from '@nestjs/common';
import { globalValidationPipe } from '../dtos/global-validation-pipe.js';

export function QueryParam(): ParameterDecorator {
  return (...args) => {
    Query(globalValidationPipe)(...args);
  };
}
