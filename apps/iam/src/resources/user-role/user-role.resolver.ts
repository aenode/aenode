import { Prisma, PrismaClient } from '@aenode/iam-db/client';
import * as Dtos from '@aenode/iam-db/dtos';
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

@Resolver(() => Dtos.UserRoleReadDto)
export class UserRoleResolver {
  protected readonly list: Partial<Dtos.UserRoleReadDto>[] = [];
  protected readonly sub = new PubSub();

  constructor(
    @InjectClient() protected readonly client: PrismaClient,
    @InjectDelegate(Prisma.ModelName.UserRole)
    protected readonly delegate: Prisma.UserRoleDelegate,
  ) {}

  @Query(() => [Dtos.UserRoleReadDto], { nullable: true })
  protected findManyUserRole(
    @ArgsQuery(() => Dtos.UserRoleFindManyArgsDto)
    query: Dtos.UserRoleFindManyArgsDto,
  ) {
    return this.delegate.findMany(query);
  }

  @Query(() => Dtos.UserRoleReadDto, { nullable: true })
  protected findUserRoleById(
    @ArgsId() id: number,
    @ArgsQuery(() => Dtos.UserRoleFindOneArgsDto)
    query: Dtos.UserRoleFindOneArgsDto,
  ) {
    return this.delegate.findUnique({ ...query, where: { id } });
  }

  @Mutation(() => Dtos.UserRoleReadDto)
  protected createUserRole(
    @ArgsInput(() => Dtos.UserRoleCreateDto) data: Dtos.UserRoleCreateDto,
  ) {
    return this.delegate.create({ data });
  }

  @Mutation(() => Dtos.UserRoleReadDto)
  protected updateUserRoleById(
    @ArgsId() id: number,
    @ArgsInput(() => Dtos.UserRoleUpdateDto)
    data: Dtos.UserRoleUpdateDto,
  ) {
    return this.delegate.update({ where: { id }, data });
  }

  @Mutation(() => Dtos.UserRoleReadDto)
  protected deleteUserRoleById(@ArgsId() id: number) {
    return this.delegate.delete({ where: { id } });
  }

  @Subscription(() => Dtos.UserRoleReadDto)
  protected onCreatedUserRole() {
    return this.sub.asyncIterableIterator('onCreateUserRole');
  }

  @Subscription(() => Dtos.UserRoleReadDto)
  protected onUpdatedUserRole() {
    return this.sub.asyncIterableIterator('onUpdateUserRole');
  }
}
