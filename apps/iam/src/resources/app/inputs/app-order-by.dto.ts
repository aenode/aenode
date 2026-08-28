import { Prisma } from '@aenode/iam-db/client';
import {
  OrderCountDto,
  PropOrder,
  PropOrderCount,
  SortOrder,
} from '@aenode/nestjs/graphql';
import { InputType } from '@nestjs/graphql';

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

  @PropOrderCount() permissions: OrderCountDto;
  @PropOrderCount() roles: OrderCountDto;
  @PropOrderCount() rolePermissions: OrderCountDto;
  @PropOrderCount() appUsers: OrderCountDto;
  @PropOrderCount() userRoles: OrderCountDto;
}
