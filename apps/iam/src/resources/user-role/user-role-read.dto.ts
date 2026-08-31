import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class UserRoleReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() appId?: number;
  @Prop() userId?: number;
  @Prop() roleId?: number;
}