import {
  BooleanFilterDto,
  DateFilterDto,
  InputType,
  IntFilterDto,
  Prop,
  StringFilterDto,
} from '@aenode/nestjs/graphql';

@InputType()
export class AppWhereDto {
  @Prop({ object: () => AppWhereDto, isArray: true })
  AND: AppWhereDto[];

  @Prop({ object: () => AppWhereDto, isArray: true })
  OR: AppWhereDto[];

  @Prop({ object: () => AppWhereDto, isArray: true })
  NOT: AppWhereDto[];

  @Prop() id?: IntFilterDto;
  @Prop() uuid?: StringFilterDto;
  @Prop() createdAt?: DateFilterDto;
  @Prop() updatedAt?: DateFilterDto;
  @Prop() deletedAt?: DateFilterDto;
  @Prop() isActive?: BooleanFilterDto;

  @Prop({ object: () => StringFilterDto }) name?: StringFilterDto;
  @Prop({ object: () => StringFilterDto }) description?: StringFilterDto;
  @Prop({ object: () => StringFilterDto }) url?: StringFilterDto;

  // - [ ] add relation wheres
  // permissions: Prisma.PermissionListRelationFilter;
  // roles: Prisma.RoleListRelationFilter;
  // rolePermissions: Prisma.RolePermissionListRelationFilter;
  // appUsers: Prisma.AppUserListRelationFilter;
  // userRoles: Prisma.UserRoleListRelationFilter;
}

@InputType()
export class AppListWhereDto {
  @Prop({ object: () => AppWhereDto }) every: AppWhereDto;
  @Prop({ object: () => AppWhereDto }) some: AppWhereDto;
  @Prop({ object: () => AppWhereDto }) none: AppWhereDto;
}
