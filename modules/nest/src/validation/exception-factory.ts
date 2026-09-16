import { BadRequestException, type ValidationError } from '@nestjs/common';
import type { InputValiationErrorDto } from './input-validation-error.dto.js';

export function exceptionFactory(errors: ValidationError[]) {
  throw new BadRequestException({
    errors: errors
      .flatMap((e) => {
        return [e, ...(e.children ?? [])];
      })
      .flatMap((e) => {
        return Object.entries(e.constraints ?? {}).map(
          ([constraint, message]) => {
            return {
              property: e.property,
              constraint,
              message,
            } as InputValiationErrorDto;
          },
        );
      }),
  });
}
