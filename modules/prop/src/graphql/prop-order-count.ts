import { OrderCountDto } from './common-dtos.js';
import { Prop } from './prop.js';

export function PropOrderCount(): PropertyDecorator {
  return (...args) => {
    Prop({ type: () => OrderCountDto })(...args);
  };
}
