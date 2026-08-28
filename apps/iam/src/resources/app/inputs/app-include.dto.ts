import type { Prisma } from '@aenode/iam-db/client';
import { InputType, Prop } from '@aenode/nestjs/graphql';

@InputType()
export class AppIncludeDto implements Prisma.AppInclude {
  @Prop() permissions: boolean;
  @Prop() roles: boolean;
  @Prop() rolePermissions: boolean;
  @Prop() appUsers: boolean;
  @Prop() userRoles: boolean;
}
