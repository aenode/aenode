import { Prisma, PrismaClient } from '@aenode/iam-db/client';
import {
  ArgsId,
  ArgsInput,
  ArgsQuery,
  Mutation,
  PubSub,
  Query,
  Resolver,
  Subscription,
} from '@aenode/nestjs/graphql';
import { InjectClient, InjectDelegate } from '@aenode/prisma/pg';
import { AppCreateDto } from './inputs/app-create.dto.js';
import { AppFindManyArgsDto } from './inputs/app-find-many-args.dto.js';
import { AppReadDto } from './inputs/app-read.dto.js';
import { AppUpdateDto } from './inputs/app-update.dto.js';

@Resolver(() => AppReadDto)
export class AppResolver {
  protected readonly list: Partial<AppReadDto>[] = [];
  protected readonly sub = new PubSub();

  constructor(
    @InjectClient() protected readonly client: PrismaClient,
    @InjectDelegate(Prisma.ModelName.App)
    protected readonly delegate: Prisma.AppDelegate,
  ) {
    this.client.systemUser.findMany({
      where: { roles: { equals: ['Admin'], has: 'Admin' } },
    });

    this.client.user.findMany({
      where: {
        appUsers: {},
      },
    });
  }

  @Query(() => [AppReadDto], { nullable: true })
  protected findManyApp(
    @ArgsQuery(() => AppFindManyArgsDto) query: AppFindManyArgsDto,
  ) {
    return this.delegate.findMany(query);
  }

  @Query(() => AppReadDto, { nullable: true })
  protected findAppById(@ArgsId() id: number) {
    return this.delegate.findUnique({ where: { id } });
  }

  @Mutation(() => AppReadDto)
  protected createApp(@ArgsInput(() => AppCreateDto) data: AppCreateDto) {
    return this.delegate.create({ data });
  }

  @Mutation(() => AppReadDto)
  protected updateAppById(
    @ArgsId() id: number,
    @ArgsInput(() => AppUpdateDto)
    data: AppUpdateDto,
  ) {
    return this.delegate.update({ where: { id }, data });
  }

  @Mutation(() => AppReadDto)
  protected deleteAppById(@ArgsId() id: number) {
    return this.delegate.delete({ where: { id } });
  }

  @Subscription(() => AppReadDto)
  protected onCreatedApp() {
    return this.sub.asyncIterableIterator('onCreateApp');
  }

  @Subscription(() => AppReadDto)
  protected onUpdatedApp() {
    return this.sub.asyncIterableIterator('onUpdateApp');
  }
}
