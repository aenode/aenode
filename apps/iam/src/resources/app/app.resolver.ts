import {
  ArgsId,
  ArgsInput,
  ArgsQuery,
  MutationMethod,
  PubSub,
  QueryMethod,
  SubscriptionMethod,
} from '@aenode/nestjs/graphql';
import { AppCreateInput } from './inputs/app-create-input.js';
import { AppUpdateInput } from './inputs/app-update-input.js';
import { App } from './inputs/app.js';

import { Resolver } from '@nestjs/graphql';
import { AppQueryArgs } from './inputs/app-query-args.js';

@Resolver(() => App)
export class AppResolver {
  protected readonly list: Partial<App>[] = [];
  protected readonly sub = new PubSub();

  @QueryMethod(() => [App])
  async findMany(@ArgsQuery(() => AppQueryArgs) query: AppQueryArgs) {
    query.skip ??= 0;
    query.take ??= 20;
    const till = query.skip + query.take;
    return this.list.slice(query.skip, till);
  }

  @MutationMethod(() => App)
  async create(
    @ArgsInput(() => AppCreateInput)
    input: AppCreateInput,
  ) {
    await this.sub.publish('onCreateApp', { onCreateApp: input });
    const newLength = this.list.push({ ...input, id: this.list.length + 1 });
    const created = this.list[newLength - 1];

    return created;
  }

  @MutationMethod(() => App)
  async update(
    @ArgsId() id: number,
    @ArgsInput(() => AppUpdateInput)
    input: AppUpdateInput,
  ) {
    await this.sub.publish('onUpdateApp', { onUpdateApp: input });

    const index = this.list.findIndex((e) => e.id === id);
    this.list[index] = { ...this.list[index], ...input };
    return this.list[index];
  }

  @MutationMethod(() => App)
  async delete(@ArgsId() id: number) {
    const index = this.list.findIndex((e) => e.id === id);
    const value = this.list[index];
    this.list.splice(index, 1);
    return value;
  }

  @SubscriptionMethod(() => App)
  onCreate() {
    return this.sub.asyncIterableIterator('onCreateApp');
  }

  @SubscriptionMethod(() => App)
  onUpdate() {
    return this.sub.asyncIterableIterator('onUpdateApp');
  }
}
