import { Transform } from 'class-transformer';

export function ToNumberTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        const num = parseFloat(value);

        if (!Number.isNaN(num)) {
          return num;
        }
      }
      return value;
    })(...args);
  };
}
