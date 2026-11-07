import { UnprocessableEntityException } from '@aenode/nest/common';
import {
  type ClassConstructor,
  plainToInstance,
} from '@aenode/nest/transformer';
import { validate, validateSync } from '@aenode/nest/validator';
import { toValidationErrorDto } from './to-validation-error-dto.js';

export function transformAndValidateSyncTest<T extends object>(
  type: ClassConstructor<T>,
  value: unknown,
): string[] {
  const instance = plainToInstance(type, value, {
    excludeExtraneousValues: true,
    exposeUnsetFields: true,
    exposeDefaultValues: true,
  });

  const foundErrors = validateSync(instance, {});

  const foundConstraints = foundErrors
    .flatMap((e) => [e, ...(e.children ?? [])])
    .flatMap((e) => {
      return Object.keys(e.constraints ?? {});
    });

  return foundConstraints;
}

/**
 * Transform and validate the object. Return the transformed value if valid or throw the error in {@link validationError[]} format
 *
 * @param type
 * @param value
 * @returns
 */
export async function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: unknown,
) {
  const instance = plainToInstance(type, value, {
    excludeExtraneousValues: true,
    exposeUnsetFields: true,
    exposeDefaultValues: true,
  });

  const foundErrors = await validate(instance, {
    validationError: { target: false, value: false },
  });

  if (foundErrors && foundErrors.length > 0) {
    const errors = foundErrors.flatMap((e) => toValidationErrorDto(e));
    throw new UnprocessableEntityException({ errors });
  }

  return instance;
}
