import {
  PropValidation,
  type PropValidationOptions,
} from '@aenode/prop-validation';
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

    const type = primitiveType ?? enumType ?? objectType;

    if (type) {
      Field(() => type(), { defaultValue: options.defaultValue, nullable })(
        ...args,
      );
    } else {
      Field({ defaultValue: options.defaultValue, nullable })(...args);
    }
  };
}
