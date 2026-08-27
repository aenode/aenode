import { InputType, Prop } from '@aenode/nestjs/graphql';

@InputType()
export class SampleQueryArgs {
  @Prop({ min: 1 }) take?: number;
  @Prop({ min: 0 }) skip?: number;
}
