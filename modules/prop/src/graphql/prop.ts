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
    const nullable = options.isRequired !== true;
    PropValidation(options)(...args);

    const { type: primitiveType, object: objectType, enum: enumType } = options;

    const type =
      primitiveType ??
      enumType ??
      objectType ??
      (() => getPropertyType(args[0], args[1]));

    Field(type, { nullable })(...args);
  };
}
