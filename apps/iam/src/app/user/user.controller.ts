import {
  Body,
  DateFilterDto,
  Param,
  ParseIntPipe,
  PartialType,
  PickType,
  Prop,
  Query,
  ResourceDecoratorFactory,
} from '@aenode/nest';
import { InjectPrismaDelegate } from '@aenode/prisma';
import { Prisma } from '../../generated/prisma/client.js';

export class UserScalarWhereDto
  implements Required<Prisma.UserScalarWhereWithAggregatesInput>
{
  @Prop({ type: () => UserScalarWhereDto }) AND: UserScalarWhereDto[];
  @Prop({ type: () => UserScalarWhereDto }) OR: UserScalarWhereDto[];
  @Prop({ type: () => UserScalarWhereDto }) NOT: UserScalarWhereDto[];
  @Prop() id: number;
  @Prop() isActive: boolean;
  @Prop({ format: 'email' }) username: string;
  @Prop({ format: 'uuid7' }) uuid: string;
  @Prop() createdAt: DateFilterDto;
  @Prop() updatedAt: DateFilterDto;
  @Prop() password: string;
  @Prop() avatar: string;
}

export class UserListFilterDto {
  @Prop({ type: () => UserScalarWhereDto }) every: UserScalarWhereDto;
  @Prop({ type: () => UserScalarWhereDto }) some: UserScalarWhereDto;
  @Prop({ type: () => UserScalarWhereDto }) none: UserScalarWhereDto;
}

export class UserSelectDto {
  @Prop() password: boolean;
  @Prop() uuid: boolean;
  @Prop() id: boolean;
  @Prop() createdAt: boolean;
  @Prop() updatedAt: boolean;
  @Prop() isActive: boolean;
  @Prop() username: boolean;
  @Prop() avatar: boolean;
}

export class UserOmitDto {
  @Prop() password: boolean;
  @Prop() uuid: boolean;
  @Prop() id: boolean;
  @Prop() createdAt: boolean;
  @Prop() updatedAt: boolean;
  @Prop() isActive: boolean;
  @Prop() username: boolean;
  @Prop() avatar: boolean;
}

export class UserIncludeDto implements Required<Prisma.UserInclude> {
  @Prop() userRoles: boolean;
  @Prop() comments: boolean;
  @Prop() userTasks: boolean;
  @Prop() _count: boolean;
}
export class UserFindManyDto {
  @Prop({ defaultValue: 20 }) take?: number;
  @Prop({ defaultValue: 0 }) skip?: number;
  @Prop({ defaultValue: null }) cursor?: UserScalarWhereDto;
  @Prop({ defaultValue: null }) where?: UserScalarWhereDto;
  @Prop({ defaultValue: null, notWith: ['omit', 'inlclude'] })
  select?: UserSelectDto;
  @Prop({ defaultValue: null, notWith: ['select', 'inlclude'] })
  omit?: UserOmitDto;
  @Prop({ defaultValue: null, notWith: ['select', 'omit'] })
  include?: UserIncludeDto;
}

export class UserDto implements Prisma.UserModel {
  @Prop() id: number;
  @Prop() uuid: string;
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;
  @Prop() isActive: boolean;
  @Prop({ required: true, format: 'email' }) username: string;
  @Prop({ required: true, format: 'password' }) password: string;
  @Prop({ format: 'url' }) avatar: string;
}

export class UserCreateDto extends PickType(UserDto, [
  'username',
  'password',
  'avatar',
]) {}

export class UserUpdateDto extends PartialType(UserCreateDto) {}

const UserDecoratorFactory = new ResourceDecoratorFactory({
  singularPath: 'user',
  pluralPath: 'users',
  responseType: UserDto,
});

@UserDecoratorFactory.Controller()
export class UserController {
  constructor(
    @InjectPrismaDelegate(Prisma.ModelName.User)
    protected readonly delegate: Prisma.UserDelegate,
  ) {}

  @UserDecoratorFactory.FindMany()
  findMany(@Query() query: UserFindManyDto) {
    console.table({ query });
    return this.delegate.findMany(query);
  }

  @UserDecoratorFactory.FindOneById()
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.delegate.findUnique({ where: { id } });
  }
  @UserDecoratorFactory.CreateOne()
  createOne(@Body() data: UserCreateDto) {
    return this.delegate.create({ data });
  }

  @UserDecoratorFactory.UpdateOneById()
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserUpdateDto,
  ) {
    return this.delegate.update({ where: { id }, data });
  }

  @UserDecoratorFactory.DeleteOneById()
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.delegate.update({ where: { id }, data: { isActive: false } });
  }
}
