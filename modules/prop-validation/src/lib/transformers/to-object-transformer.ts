import { Transform } from 'class-transformer';
import { isJSON } from 'class-validator';

export function ToObjectTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (isJSON(value)) {
          return JSON.parse(value);
        }
      } else if (value === null) {
        return undefined;
      }

      return value;
    })(...args);
  };
}
