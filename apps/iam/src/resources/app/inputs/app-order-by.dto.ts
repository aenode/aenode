import { Prisma } from '@aenode/iam-db/client';
import {
  InputType,
  PropOrder,
  PropOrderCount,
  SortCountDto,
  SortOrder,
} from '@aenode/nestjs/graphql';

@InputType()
export class AppOrderByDto
  implements Required<Prisma.AppOrderByWithRelationInput>
{
  @PropOrder() id: SortOrder;
  @PropOrder() uuid: SortOrder;
  @PropOrder() createdAt: SortOrder;
  @PropOrder() updatedAt: SortOrder;
  @PropOrder() deletedAt: SortOrder;
  @PropOrder() isActive: SortOrder;
  @PropOrder() name: SortOrder;
  @PropOrder() description: SortOrder;
  @PropOrder() url: SortOrder;

  @PropOrderCount() permissions: SortCountDto;
  @PropOrderCount() roles: SortCountDto;
  @PropOrderCount() rolePermissions: SortCountDto;
  @PropOrderCount() appUsers: SortCountDto;
  @PropOrderCount() userRoles: SortCountDto;
}
