import { InputType, Prop } from '@aenode/nestjs/graphql';

@InputType()
export class SampleFindManyArgs {
  @Prop({ min: 1 }) take?: number;
  @Prop({ min: 0 }) skip?: number;
}
