import { InputType, Prop } from '@aenode/nestjs/graphql';
import { AppOrderByDto } from './app-order-by.dto.js';

@InputType()
export class AppFindManyArgsDto {
  @Prop({ min: 1, defaultValue: 20 }) take?: number;
  @Prop({ min: 0, defaultValue: 20 }) skip?: number;
  @Prop({ type: () => AppOrderByDto }) orderBy?: AppOrderByDto;
}
