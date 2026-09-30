import { Expose } from 'class-transformer';
import { IsOptional, type ValidationOptions } from 'class-validator';
import { DefaultValueTransformer } from './default-value-transformer.js';
import type { PropValidationOptions } from './prop-options.js';
import { LessThan } from './validators/less-than.js';
import { MoreThan } from './validators/more-than.js';
import { NotWith } from './validators/not-with.js';
import { NotWithout } from './validators/not-without.js';

/**
 * Common validations and transform decorators including
 * - Expose
 * - IsDefined
 * - IsOptional
 * - DefaultValueTransformer
 *
 * @param options property validation options
 * @param validationOptions class-validator validation options
 * @returns
 */
export function __PropCommon(
  options: PropValidationOptions,
  validationOptions: ValidationOptions,
): PropertyDecorator {
  return (...args) => {
    const { required } = options;

    Expose({ groups: options.groups })(...args);

    if (options.notWith) {
      NotWith(options.notWith)(...args);
    }

    if (options.notWithout) {
      NotWithout(options.notWithout)(...args);
    }

    if (options.moreThan) {
      MoreThan(options.moreThan, validationOptions)(...args);
    }

    if (options.lessThan) {
      LessThan(options.lessThan, validationOptions)(...args);
    }

    DefaultValueTransformer(options)(...args);

    if (required !== true) {
      IsOptional(validationOptions)(...args);
    }
  };
}
