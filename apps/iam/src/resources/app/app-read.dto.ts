import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class AppReadDto {
  @Prop() id?: number;
  @Prop() uuid?: string;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() url?: string;
}