import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class UserReadDto {
  @Prop() id?: number;
  @Prop() uuid?: string;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() fullName?: string;
  @Prop() username?: string;
  @Prop() password?: string;
  @Prop() lastLogin?: Date;
}