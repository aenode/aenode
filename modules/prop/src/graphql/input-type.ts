import { InputType as __InputType } from '@nestjs/graphql';

export function InputType(): ClassDecorator {
  return (...args) => {
    __InputType()(...args);
  };
}
