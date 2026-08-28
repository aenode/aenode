import { InputType, Prop, StringArray } from '@aenode/nestjs/graphql';

@InputType()
export class AppCreateInput {
  @Prop({ isRequired: true }) name: string;
  @Prop() description?: string;
  @Prop() tags?: StringArray;
  @Prop() dueDdate?: Date;
}
