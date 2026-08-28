import { SortOrder } from '@aenode/types';
import { Prop } from './prop.js';

export function PropOrder(): PropertyDecorator {
  return (...args) => {
    Prop({ enum: () => SortOrder })(...args);
  };
}
