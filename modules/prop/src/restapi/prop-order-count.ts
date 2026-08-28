import { Prop } from './prop.js';
import { SortCountDto } from './sort-count.dto.js';

export function PropOrderCount(): PropertyDecorator {
  return (...args) => {
    Prop({ object: () => SortCountDto })(...args);
  };
}
