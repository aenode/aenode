import { Prop, ObjectType } from '@aenode/nestjs/graphql';

@ObjectType()
export class AppUserReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() appId?: number;
  @Prop() userId?: number;
  @Prop({ type: ()=>String, isArray: true }) operations?: string[];
}