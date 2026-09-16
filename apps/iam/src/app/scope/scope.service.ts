import { Prisma } from '@aenode/iam-db/client';
import { Injectable } from '@aenode/nest';
import { InjectDelegate } from '@aenode/prisma/pg';
import type { ScopeCreateDto } from './scope.input.js';
import type { ScopeQueryDto } from './scope.query.js';

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

  private toSearchQuery(search?: string) {
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

  async findMany(query: ScopeQueryDto) {
    const { orderBy, orderDir, skip, take, search } = query;
    const result = await this.delegate.findMany({
      where: { deletedAt: null, ...this.toSearchQuery(search) },
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
