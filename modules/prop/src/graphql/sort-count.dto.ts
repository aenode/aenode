import { SortOrder } from '@aenode/types';
import { InputType } from '@nestjs/graphql';
import { Prop } from './prop.js';

@InputType()
export class SortCountDto {
  @Prop({ enum: () => SortOrder }) _count?: SortOrder;
}
