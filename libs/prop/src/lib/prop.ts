import 'class-transformer';
import 'class-validator';

export function PropValidation(): PropertyDecorator {
  return (...args) => {
    console.log(...args);
  };
}
