import { Prisma } from '@aenode/iam-db';
import {
  BaseDto,
  BaseQueryDto,
  PartialType,
  PickType,
  Prop,
} from '@aenode/nest';

export class ScopeFindManyDto extends BaseQueryDto {
  @Prop({
    enum: Prisma.ScopeScalarFieldEnum,
    default: Prisma.ScopeScalarFieldEnum.id,
  })
  orderBy: Prisma.ScopeScalarFieldEnum;

  @Prop({ enum: Prisma.SortOrder, default: Prisma.SortOrder.asc })
  orderDir: Prisma.SortOrder;
}

export class ScopeReadDto extends BaseDto {
  @Prop({
    required: true,
    format: 'name',
    description: 'Unique scope name',
    example: 'iam',
  })
  name: string;

  @Prop({
    maxLength: 400,
    description: 'Scope description',
    example: 'Identity and access management',
  })
  description?: string;
}

export class ScopeCreateDto extends PickType(ScopeReadDto, [
  'name',
  'description',
]) {}

export class ScopeUpdateDto extends PartialType(ScopeCreateDto) {}
