import { SortOrder } from '@aenode/types';
import { Prop } from './prop.js';

export class SortCountDto {
  @Prop({ enum: () => SortOrder }) _count?: SortOrder;
}
