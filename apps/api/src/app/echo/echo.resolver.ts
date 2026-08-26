import {
  Args,
  AutoResolver,
  InputType,
  ObjectType,
  Prop,
  PubSub,
  QueryMethod,
  SubscriptionMethod,
} from '@aenode/nestjs/graphql';

@ObjectType()
export class Echo {
  @Prop() echo: string;
}

@InputType()
export class EchoInput {
  @Prop({ isRequired: true }) echo: string;
}

@AutoResolver(() => Echo)
export class EchoResolver {
  protected readonly sub = new PubSub();

  @QueryMethod(() => Echo)
  async echo(
    @Args({ name: 'echo', type: () => EchoInput }) echoInput: EchoInput,
  ) {
    await this.sub.publish('onEchoEcho', { onEchoEcho: echoInput });
    return echoInput;
  }

  @SubscriptionMethod(() => Echo)
  onEcho() {
    return this.sub.asyncIterableIterator('onEchoEcho');
  }
}
