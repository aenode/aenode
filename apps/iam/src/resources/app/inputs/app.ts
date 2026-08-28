import { ObjectType, Prop, StringArray } from '@aenode/nestjs/graphql';

/**
 * App object
 */
@ObjectType()
export class App {
  @Prop() id?: number;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() tags?: StringArray;
  @Prop() dueDdate?: Date;
}
