import { PropValidation } from '@aenode/prop-validation';
import { Field, registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

export function PropOrder(): PropertyDecorator {
  return (...args) => {
    PropValidation({ isIn: Object.keys(SortOrder) })(...args);
    Field(() => SortOrder, { nullable: true })(...args);
  };
}
