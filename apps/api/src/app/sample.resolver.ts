import { ObjectType, Prop, Query, Resolver } from '@aenode/nestjs/graphql';

@ObjectType()
export class Sample {
  @Prop() name: string;
}

@Resolver()
export class SampleResolver {
  @Query(() => [Sample])
  findManySample() {
    return [];
  }
}
