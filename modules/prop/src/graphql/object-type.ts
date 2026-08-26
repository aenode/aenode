import { ObjectType as __ObjectType } from '@nestjs/graphql';

export function ObjectType(): ClassDecorator {
  return (...args) => {
    __ObjectType()(...args);
  };
}
