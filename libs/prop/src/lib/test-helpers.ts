import {
  type ClassConstructor,
  plainToInstance,
} from '@aenode/nest/transformer';
import { validateSync } from '@aenode/nest/validator';

export function transformAndValidate<T extends object>(
  type: ClassConstructor<T>,
  value: T,
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
