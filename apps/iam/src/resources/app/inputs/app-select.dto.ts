import type { Prisma } from '@aenode/iam-db/client';
import { InputType, Prop } from '@aenode/nestjs/graphql';

@InputType()
export class AppSelectDto implements Prisma.AppSelect {
  @Prop() id?: boolean;
  @Prop() uuid?: boolean;
  @Prop() createdAt?: boolean;
  @Prop() updatedAt?: boolean;
  @Prop() deletedAt?: boolean;
  @Prop() isActive?: boolean;
  @Prop() name?: boolean;
  @Prop() description?: boolean;
  @Prop() url?: boolean;
  @Prop() permissions?: boolean;
  @Prop() roles?: boolean;
  @Prop() rolePermissions?: boolean;
  @Prop() appUsers?: boolean;
  @Prop() userRoles?: boolean;
}
