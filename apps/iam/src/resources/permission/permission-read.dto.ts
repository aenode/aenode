import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class PermissionReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() appId?: number;
}