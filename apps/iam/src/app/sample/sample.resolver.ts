import {
  ArgsId,
  ArgsInput,
  ArgsQuery,
  MutationMethod,
  PubSub,
  QueryMethod,
  SubscriptionMethod,
} from '@aenode/nestjs/graphql';
import { SampleCreateInput } from './inputs/sample-create-input.js';
import { SampleUpdateInput } from './inputs/sample-update-input.js';
import { Sample } from './inputs/sample.js';

import { Resolver } from '@nestjs/graphql';
import { SampleFindManyArgs } from './inputs/sample-find-many-args.js';

@Resolver(() => Sample)
export class SampleResolver {
  protected readonly list: Partial<Sample>[] = [];
  protected readonly sub = new PubSub();

  @QueryMethod(() => [Sample])
  async findMany(
    @ArgsQuery(() => SampleFindManyArgs) query: SampleFindManyArgs,
  ) {
    query.skip ??= 0;
    query.take ??= 20;
    const till = query.skip + query.take;
    return this.list.slice(query.skip, till);
  }

  @MutationMethod(() => Sample)
  async create(
    @ArgsInput(() => SampleCreateInput)
    input: SampleCreateInput,
  ) {
    await this.sub.publish('onCreateSample', { onCreateSample: input });
    const newLength = this.list.push({ ...input, id: this.list.length + 1 });
    const created = this.list[newLength - 1];

    return created;
  }

  @MutationMethod(() => Sample)
  async update(
    @ArgsId() id: number,
    @ArgsInput(() => SampleUpdateInput)
    input: SampleUpdateInput,
  ) {
    await this.sub.publish('onUpdateSample', { onUpdateSample: input });

    const index = this.list.findIndex((e) => e.id === id);
    this.list[index] = { ...this.list[index], ...input };
    return this.list[index];
  }

  @MutationMethod(() => Sample)
  async delete(@ArgsId() id: number) {
    const index = this.list.findIndex((e) => e.id === id);
    const value = this.list[index];
    this.list.splice(index, 1);
    return value;
  }

  @SubscriptionMethod(() => Sample)
  onCreate() {
    return this.sub.asyncIterableIterator('onCreateSample');
  }

  @SubscriptionMethod(() => Sample)
  onUpdate() {
    return this.sub.asyncIterableIterator('onUpdateSample');
  }
}
