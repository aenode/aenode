import { Transform } from 'class-transformer';
import { isDateString } from 'class-validator';

export function ToDateTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (isDateString(value)) {
          return new Date(value);
        }
      }
      return value;
    })(...args);
  };
}
