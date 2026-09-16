import { Prisma } from '@aenode/iam-db';
import { Prop } from '@aenode/nest';

export class ScopeQueryDto {
  @Prop({ min: 1, default: 20 }) take: number;
  @Prop({ min: 0, default: 0 }) skip: number;

  @Prop({
    enum: Prisma.ScopeScalarFieldEnum,
    default: Prisma.ScopeScalarFieldEnum.id,
  })
  orderBy: Prisma.ScopeScalarFieldEnum;

  @Prop({
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.asc,
  })
  orderDir: Prisma.SortOrder;

  @Prop({ description: 'Search string' }) search?: string;
}
