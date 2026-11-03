import { Transform } from '@aenode/nest/transformer';
import { isJSON } from '@aenode/nest/validator';

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
