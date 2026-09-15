import { Transform } from 'class-transformer';

export function ToBooleanTransformer(): PropertyDecorator {
  return (...args) => {
    Transform(({ value }) => {
      if (typeof value === 'string') {
        if (/1|true/i.test(value)) {
          return true;
        } else if (/-1|0|false/i.test(value)) {
          return false;
        }
      }
      return value;
    })(...args);
  };
}
