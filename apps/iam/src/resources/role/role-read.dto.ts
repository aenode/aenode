import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class RoleReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() appId?: number;
  @Prop() name?: string;
}