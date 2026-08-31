import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class RolePermissionReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() appId?: number;
  @Prop() roleId?: number;
  @Prop() permissionId?: number;
}