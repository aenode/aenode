import {
  PropValidation,
  type PropValidationOptions,
} from '@aenode/prop-validation';
import { getPropertyType } from '@aenode/reflect';
import { Field } from '@nestjs/graphql';

/**
 * Graphql field property
 *
 * @param options
 * @returns
 */
export function Prop(options: PropValidationOptions = {}): PropertyDecorator {
  return (...args) => {
    const required = options.isRequired === true;
    PropValidation(options)(...args);

    Field(options.type ?? (() => getPropertyType(args[0], args[1])), {
      nullable: required === false,
    })(...args);
  };
}
