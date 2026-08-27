import { InputType, Prop, StringArray } from '@aenode/nestjs/graphql';

@InputType()
export class SampleCreateInput {
  @Prop({ isRequired: true }) name: string;
  @Prop() description?: string;
  @Prop() tags?: StringArray;
  @Prop() dueDdate?: Date;
}
