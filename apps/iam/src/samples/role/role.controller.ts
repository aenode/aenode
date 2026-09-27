import { Prisma } from '@aenode/iam-db/client';
import { AutoController, Prop, Query, StringFilterDto } from '@aenode/nestjs';
import { InjectDelegate } from '@aenode/prisma/pg';

export class RoleWhereDto {
  @Prop({ object: () => StringFilterDto }) name: StringFilterDto;
}

export class RoleFindManyDto {
  @Prop({ type: () => Number, min: 0 }) take?: number;
  @Prop({ type: () => Number, min: 0 }) skip?: number;
}

export class CreateRoleDto {
  @Prop({ type: () => String, isRequired: true }) name: string;
  @Prop({ type: () => Number, isRequired: true }) appId: number;
}

@AutoController()
export class RoleController {
  constructor(
    @InjectDelegate(Prisma.ModelName.Role)
    protected readonly delegate: Prisma.RoleDelegate,
  ) {}

  findMany(@Query() query: RoleFindManyDto) {
    return this.delegate.findMany(query);
  }

  createRole(data: CreateRoleDto) {
    return this.delegate.create({ data });
  }
}
