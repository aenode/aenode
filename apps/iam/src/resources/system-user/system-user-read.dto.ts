import { Prop, ObjectType } from '@aenode/nestjs/graphql';
import * as P from '../../prisma/client.js';
@ObjectType()
export class SystemUserReadDto {
  @Prop() id?: number;
  @Prop() createdAt?: Date;
  @Prop() updatedAt?: Date;
  @Prop() deletedAt?: Date;
  @Prop() isActive?: boolean;
  @Prop() username?: string;
  @Prop({ format: 'password' }) password?: string;
  @Prop({ enum: ()=>P.$Enums.SystemRole }) role?: P.$Enums.SystemRole;
}