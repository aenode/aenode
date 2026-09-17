import { Prisma } from '@aenode/iam-db/client';
import type { ScopeWhereInput } from '@aenode/iam-db/models';
import { Injectable } from '@aenode/nest';
import { InjectDelegate } from '@aenode/prisma/pg';
import type { ScopeCreateDto, ScopeFindManyDto } from './scope.dto.js';

@Injectable()
export class ScopeService {
  private readonly searchables = [
    Prisma.ScopeScalarFieldEnum.name,
    Prisma.ScopeScalarFieldEnum.description,
  ];
  constructor(
    @InjectDelegate(Prisma.ModelName.Scope)
    protected readonly delegate: Prisma.ScopeDelegate,
  ) {}

  private toSearchQuery(search: string | undefined) {
    return this.searchables.reduce(
      (acc, s) => {
        acc[s] = {
          contains: search,
          mode: 'insensitive',
        } as Prisma.StringFilter;
        return acc;
      },
      {} as Record<string, Prisma.StringFilter>,
    );
  }

  protected toWhere(search: string | undefined): ScopeWhereInput {
    return {
      deletedAt: null,
      ...this.toSearchQuery(search),
    };
  }

  async findMany(query: ScopeFindManyDto) {
    const { orderBy, orderDir, skip, take, search } = query;
    const result = await this.delegate.findMany({
      where: this.toWhere(search),
      take,
      skip,
      orderBy: { [orderBy]: orderDir },
    });

    return result;
  }

  async findOneById(id: number) {
    return await this.delegate.findUniqueOrThrow({ where: { id } });
  }

  create(data: ScopeCreateDto) {
    return this.delegate.create({ data });
  }

  updateOneById(id: number, data: Prisma.ScopeUpdateInput) {
    return this.delegate.update({ where: { id }, data });
  }

  hardDeleteOneById(id: number) {
    return this.delegate.delete({ where: { id } });
  }

  softDeleteOneById(id: number) {
    return this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  resoverOneById(id: number) {
    return this.delegate.update({ where: { id }, data: { deletedAt: null } });
  }
}
