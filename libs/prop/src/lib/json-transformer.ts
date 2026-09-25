import { Transform } from 'class-transformer';
import { isJSON } from 'class-validator';

export function JsonTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (isJSON(value)) {
        return JSON.parse(value);
      }
      return value;
    })(...args);
  };
}
