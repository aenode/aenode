import { ObjectType, Prop, StringArray } from '@aenode/nestjs/graphql';

/**
 * Sample object
 */
@ObjectType()
export class Sample {
  @Prop() id?: number;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() tags?: StringArray;
  @Prop() dueDdate?: Date;
}
